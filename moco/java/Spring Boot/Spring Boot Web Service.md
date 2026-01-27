---
title: Web Service
description: 'Spring Boot: Web Service'
tags:
  - SpringBoot
sidebar_position: 70
hide_table_of_contents: true
date_created: 2023-02-24T00:00:00.000Z
date_updated: 2023-02-24T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /java/spring-boot/spring-boot-web-service/
---

# Spring Boot Web Services 開發指南

## 概述

Spring Boot 提供了強大的 Web Services 開發支援，包括 RESTful Web Services 和 SOAP Web Services。本文將介紹如何使用 Spring Boot 開發各種類型的 Web Services。

## RESTful Web Services

### 基本 REST Controller

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User savedUser = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        User updatedUser = userService.update(id, user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.delete(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
```

### 內容協商 (Content Negotiation)

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @GetMapping(value = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Product product = productService.findById(id);
        return ResponseEntity.ok(product);
    }
    
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }
}
```

### 異常處理

```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            "RESOURCE_NOT_FOUND",
            ex.getMessage(),
            System.currentTimeMillis()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
        ErrorResponse error = new ErrorResponse(
            "VALIDATION_ERROR",
            ex.getMessage(),
            System.currentTimeMillis()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        ErrorResponse error = new ErrorResponse(
            "INTERNAL_ERROR",
            "An unexpected error occurred",
            System.currentTimeMillis()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
```

## SOAP Web Services

### Maven 依賴

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web-services</artifactId>
    </dependency>
    <dependency>
        <groupId>wsdl4j</groupId>
        <artifactId>wsdl4j</artifactId>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.codehaus.mojo</groupId>
            <artifactId>jaxb2-maven-plugin</artifactId>
            <version>3.1.0</version>
            <executions>
                <execution>
                    <id>xjc</id>
                    <goals>
                        <goal>xjc</goal>
                    </goals>
                </execution>
            </executions>
            <configuration>
                <sources>
                    <source>${project.basedir}/src/main/resources/xsd</source>
                </sources>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### XSD 定義

```xml
<!-- src/main/resources/xsd/users.xsd -->
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           xmlns:tns="http://example.com/users"
           targetNamespace="http://example.com/users"
           elementFormDefault="qualified">

    <xs:element name="getUserRequest">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="id" type="xs:long"/>
            </xs:sequence>
        </xs:complexType>
    </xs:element>

    <xs:element name="getUserResponse">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="user" type="tns:user"/>
            </xs:sequence>
        </xs:complexType>
    </xs:element>

    <xs:complexType name="user">
        <xs:sequence>
            <xs:element name="id" type="xs:long"/>
            <xs:element name="name" type="xs:string"/>
            <xs:element name="email" type="xs:string"/>
        </xs:sequence>
    </xs:complexType>

</xs:schema>
```

### SOAP Endpoint

```java
@Endpoint
public class UserEndpoint {
    private static final String NAMESPACE_URI = "http://example.com/users";
    
    @Autowired
    private UserService userService;
    
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getUserRequest")
    @ResponsePayload
    public GetUserResponse getUser(@RequestPayload GetUserRequest request) {
        GetUserResponse response = new GetUserResponse();
        User user = userService.findById(request.getId());
        
        if (user != null) {
            com.example.users.User soapUser = new com.example.users.User();
            soapUser.setId(user.getId());
            soapUser.setName(user.getName());
            soapUser.setEmail(user.getEmail());
            response.setUser(soapUser);
        }
        
        return response;
    }
}
```

### Web Service 配置

```java
@EnableWs
@Configuration
public class WebServiceConfig extends WsConfigurerAdapter {
    
    @Bean
    public ServletRegistrationBean<MessageDispatcherServlet> messageDispatcherServlet(
            ApplicationContext applicationContext) {
        MessageDispatcherServlet servlet = new MessageDispatcherServlet();
        servlet.setApplicationContext(applicationContext);
        servlet.setTransformWsdlLocations(true);
        return new ServletRegistrationBean<>(servlet, "/ws/*");
    }
    
    @Bean(name = "users")
    public DefaultWsdl11Definition defaultWsdl11Definition(XsdSchema usersSchema) {
        DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
        wsdl11Definition.setPortTypeName("UsersPort");
        wsdl11Definition.setLocationUri("/ws");
        wsdl11Definition.setTargetNamespace("http://example.com/users");
        wsdl11Definition.setSchema(usersSchema);
        return wsdl11Definition;
    }
    
    @Bean
    public XsdSchema usersSchema() {
        return new SimpleXsdSchema(new ClassPathResource("xsd/users.xsd"));
    }
}
```

## API 文件化

### OpenAPI/Swagger 整合

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
</dependency>
```

```java
@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("User Management API")
                        .version("1.0")
                        .description("API for managing users")
                        .contact(new Contact()
                                .name("API Support")
                                .email("support@example.com")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Development server"),
                        new Server().url("https://api.example.com").description("Production server")
                ));
    }
}
```

### API 註解

```java
@RestController
@RequestMapping("/api/users")
@Tag(name = "User Management", description = "Operations related to user management")
public class UserController {
    
    @Operation(summary = "Get all users", description = "Retrieve a list of all users")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved users"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        // Implementation
    }
    
    @Operation(summary = "Create a new user")
    @PostMapping
    public ResponseEntity<User> createUser(
            @Parameter(description = "User to be created") @Valid @RequestBody User user) {
        // Implementation
    }
}
```

## 安全性

### API 金鑰驗證

```java
@Component
public class ApiKeyAuthFilter implements Filter {
    
    private static final String API_KEY_HEADER = "X-API-Key";
    
    @Value("${app.api.key}")
    private String validApiKey;
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        String apiKey = httpRequest.getHeader(API_KEY_HEADER);
        
        if (apiKey == null || !validApiKey.equals(apiKey)) {
            httpResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
            httpResponse.getWriter().write("Invalid API Key");
            return;
        }
        
        chain.doFilter(request, response);
    }
}
```

### 速率限制

```java
@Component
public class RateLimitingFilter implements Filter {
    
    private final Map<String, List<Long>> requestCounts = new ConcurrentHashMap<>();
    private final int maxRequests = 100;
    private final long timeWindow = 60000; // 1 minute
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        String clientIp = getClientIp(httpRequest);
        long currentTime = System.currentTimeMillis();
        
        requestCounts.putIfAbsent(clientIp, new ArrayList<>());
        List<Long> requests = requestCounts.get(clientIp);
        
        // Remove old requests
        requests.removeIf(time -> currentTime - time > timeWindow);
        
        if (requests.size() >= maxRequests) {
            httpResponse.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            httpResponse.getWriter().write("Rate limit exceeded");
            return;
        }
        
        requests.add(currentTime);
        chain.doFilter(request, response);
    }
    
    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
```

## 測試

### REST API 測試

```java
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestPropertySource(locations = "classpath:application-test.properties")
class UserControllerTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void shouldCreateUser() {
        User user = new User("John Doe", "john@example.com");
        
        ResponseEntity<User> response = restTemplate.postForEntity(
            "/api/users", user, User.class);
        
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getName()).isEqualTo("John Doe");
    }
    
    @Test
    void shouldGetUser() {
        User savedUser = userRepository.save(new User("Jane Doe", "jane@example.com"));
        
        ResponseEntity<User> response = restTemplate.getForEntity(
            "/api/users/" + savedUser.getId(), User.class);
        
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getName()).isEqualTo("Jane Doe");
    }
}
```

### SOAP Web Service 測試

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserEndpointTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void shouldReturnUserFromSoapService() {
        String soapRequest = """
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                              xmlns:usr="http://example.com/users">
                <soapenv:Header/>
                <soapenv:Body>
                    <usr:getUserRequest>
                        <usr:id>1</usr:id>
                    </usr:getUserRequest>
                </soapenv:Body>
            </soapenv:Envelope>
            """;
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_XML);
        headers.add("SOAPAction", "");
        
        HttpEntity<String> request = new HttpEntity<>(soapRequest, headers);
        
        ResponseEntity<String> response = restTemplate.postForEntity(
            "/ws", request, String.class);
        
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("<usr:name>");
    }
}
```

## 最佳實踐

### 1. API 版本控制

```java
@RestController
@RequestMapping("/api/v1/users")
public class UserV1Controller {
    // Version 1 implementation
}

@RestController
@RequestMapping("/api/v2/users")
public class UserV2Controller {
    // Version 2 implementation
}
```

### 2. 分頁和排序

```java
@GetMapping
public ResponseEntity<Page<User>> getUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String sortDir) {
    
    Sort sort = sortDir.equalsIgnoreCase("desc") ? 
        Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
    
    Pageable pageable = PageRequest.of(page, size, sort);
    Page<User> users = userService.findAll(pageable);
    
    return ResponseEntity.ok(users);
}
```

### 3. 快取

```java
@Service
@CacheConfig(cacheNames = "users")
public class UserService {
    
    @Cacheable(key = "#id")
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    @CacheEvict(key = "#user.id")
    public User save(User user) {
        return userRepository.save(user);
    }
    
    @CacheEvict(key = "#id")
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
```



See Also
--------

- [Spring Web Service ─ Web Service 簡介與 Server 端實作](https://www.tpisoftware.com/tpu/articleDetails/1968)
