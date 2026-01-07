---
title: Jakarta Validation
description: Jakarta Bean Validation
tags:
  - Java
  - Package
hide_table_of_contents: false
date_created: 2025-01-11T00:00:00.000Z
date_updated: 2025-01-11T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /java/packages/java-jakarta-validation/
---

# Jakarta Bean Validation

> 後端開發 API 時，常需要對 Request 欄位進行條件檢核，例如：Not NULL、僅限數字、長度限制等。
> 尤其在串接資料庫時，欄位檢核更是必要的。
>
> Node.js Express 開發常搭配 Express-Validator middleware 來簡化資料欄位基本驗證的程式碼，
> 在 Spring Boot 中，`Jakarta Bean Validation` 提供了類似且更強大的功能。

## Overview

`Jakarta Bean Validation` (前身為 Java Bean Validation) 是 Java EE/Jakarta EE 的標準規範，用於驗證 Java Bean 的屬性。Spring Boot 內建支援此規範，透過註解方式可以輕鬆實現資料驗證。

### 主要特色

- **註解驅動**：使用簡潔的註解進行驗證規則定義
- **內建驗證器**：提供豐富的內建驗證約束
- **自訂驗證**：支援自訂驗證邏輯
- **國際化支援**：錯誤訊息支援多語言
- **群組驗證**：支援不同情境下的驗證規則

## Jakarta Bean Validation Constraints

_Built-In Jakarta Bean Validation Constraints_ 都很實用.
Ref: [Introduction to Jakarta Bean Validation :: Jakarta EE Tutorial :: Jakarta EE Documentation](https://jakarta.ee/learn/docs/jakartaee-tutorial/current/beanvalidation/bean-validation/bean-validation.html).

<table>
<tr>
<td> Constraint </td> <td> Description </td> <td> Example </td>
</tr>

<tr>
<td>

`@AssertFalse`

</td>
<td>The value of the field or property must be false.</td>
<td>

```java
@AssertFalse boolean
isUnsupported;
```

</td>
</tr>

<tr>
<td>

`@AssertTrue`

</td>
<td>The value of the field or property must be true.</td>
<td>

```java
@AssertTrue boolean
isActive;
```

</td>
</tr>

<tr>
<td>

`@DecimalMax`

</td>
<td>The value of the field or property must be a decimal value lower than or equal to the number in the value element.</td>
<td>

```java
@DecimalMax("30.00")
BigDecimal discount;
```

</td>
</tr>

<tr>
<td>

`@DecimalMin`

</td>
<td>The value of the field or property must be a decimal value greater than or equal to the number in the value element.</td>
<td>

```java
@DecimalMin("5.00")
BigDecimal discount;
```

</td>
</tr>

<tr>
<td>

`@Digits`

</td>
<td>The value of the field or property must be a number within a specified range. The integer element specifies the maximum integral digits for the number, and the fraction element specifies the maximum fractional digits for the number.</td>
<td>

```java
@Digits(integer=6, fraction=2)
BigDecimal price;
```

</td>
</tr>

<tr>
<td>

`@Email`

</td>
<td>The value of the field or property must be a valid email address.</td>
<td>

```java
@Email
String emailaddress;
```

</td>
</tr>

<tr>
<td>

`@Future`

</td>
<td>The value of the field or property must be a date in the future.</td>
<td>

```java
@Future
Date eventDate;
```

</td>
</tr>

<tr>
<td>

`@FutureOrPresent`

</td>
<td>The value of the field or property must be a date or time in present or future.</td>
<td>

```java
@FutureOrPresent
Time travelTime;
```

</td>
</tr>

<tr>
<td>

`@Max`

</td>
<td>The value of the field or property must be an integer value lower than or equal to the number in the value element.</td>
<td>

```java
@Max(10)
int quantity;
```

</td>
</tr>

<tr>
<td>

`@Min`

</td>
<td>The value of the field or property must be an integer value greater than or equal to the number in the value element.</td>
<td>

```java
@Min(5)
int quantity;
```

</td>
</tr>

<tr>
<td>

`@Negative`

</td>
<td>The value of the field or property must be a negative number.</td>
<td>

```java
@Negative
int basementFloor;
```

</td>
</tr>

<tr>
<td>

`@NegativeOrZero`

</td>
<td>The value of the field or property must be negative or zero.</td>
<td>

```java
@NegativeOrZero
int debtValue;
```

</td>
</tr>

<tr>
<td>

`@NotBlank`

</td>
<td>The value of the field or property must contain at least one non-white space character.</td>
<td>

```java
@NotBlank
String message;
```

</td>
</tr>

<tr>
<td>

`@NotEmpty`

</td>
<td>The value of the field or property must not be empty. The length of the characters or array, and the size of a collection or map are evaluated.</td>
<td>

```java
@NotEmpty
String message;
```

</td>
</tr>

<tr>
<td>

`@NotNull`

</td>
<td>The value of the field or property must not be null.</td>
<td>

```java
@NotNull
String username;
```

</td>
</tr>

<tr>
<td>

`@Null`

</td>
<td>The value of the field or property must be null.</td>
<td>

```java
@Null
String unusedString;
```

</td>
</tr>

<tr>
<td>

`@Past`

</td>
<td>The value of the field or property must be a date in the past.</td>
<td>

```java
@Past
Date birthday;
```

</td>
</tr>

<tr>
<td>

`@PastOrPresent`

</td>
<td>The value of the field or property must be a date or time in the past or present.</td>
<td>

```java
@PastOrPresent
Date travelDate;
```

</td>
</tr>

<tr>
<td>

`@Pattern`

</td>
<td>The value of the field or property must match the regular expression defined in the regexp element.</td>
<td>

```java
@Pattern(regexp=
"\\(\\d{3}\\)\\d{3}-\\d{4}")
String phoneNumber;
```

</td>
</tr>

<tr>
<td>

`@Positive`

</td>
<td>The value of the field or property must be a positive number.</td>
<td>

```java
@Positive
BigDecimal area;
```

</td>
</tr>

<tr>
<td>

`@PositiveOrZero`

</td>
<td>The value of the field or property must be a positive number or zero.</td>
<td>

```java
@PositiveOrZero
int totalGoals;
```

</td>
</tr>

<tr>
<td>

`@Size`

</td>
<td>The size of the field or property is evaluated and must match the specified boundaries. If the field or property is a String, the size of the string is evaluated. If the field or property is a Collection, the size of the Collection is evaluated. If the field or property is a Map, the size of the Map is evaluated. If the field or property is an array, the size of the array is evaluated. Use one of the optional max or min elements to specify the boundaries.</td>
<td>

```java
@Size(min=2, max=240)
String briefMessage;
```

</td>
</tr>

</table>

## Spring Boot 整合使用

### 基本用法

在 Spring Boot 中使用 Jakarta Bean Validation 非常簡單：

```java
@RestController
public class UserController {
    
    @PostMapping("/users")
    public ResponseEntity<String> createUser(@Valid @RequestBody User user) {
        // 驗證通過後的處理邏輯
        return ResponseEntity.ok("User created successfully");
    }
}
```

### DTO 類別定義

```java
public class User {
    @NotBlank(message = "使用者名稱不能為空")
    @Size(min = 3, max = 20, message = "使用者名稱長度必須在 3-20 字元之間")
    private String username;
    
    @Email(message = "請輸入有效的電子郵件地址")
    @NotBlank(message = "電子郵件不能為空")
    private String email;
    
    @Min(value = 18, message = "年齡必須大於等於 18")
    @Max(value = 120, message = "年齡必須小於等於 120")
    private Integer age;
    
    // getters and setters
}
```

### 錯誤處理

```java
@ControllerAdvice
public class ValidationExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
```

## 進階功能

### 群組驗證

```java
public interface CreateGroup {}
public interface UpdateGroup {}

public class User {
    @NotNull(groups = UpdateGroup.class)
    private Long id;
    
    @NotBlank(groups = {CreateGroup.class, UpdateGroup.class})
    private String username;
}

// Controller 中使用
@PostMapping("/users")
public ResponseEntity<String> createUser(@Validated(CreateGroup.class) @RequestBody User user) {
    // 建立使用者邏輯
}
```

### 自訂驗證器

```java
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneNumberValidator.class)
public @interface PhoneNumber {
    String message() default "無效的電話號碼格式";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {
    @Override
    public boolean isValid(String phoneNumber, ConstraintValidatorContext context) {
        return phoneNumber != null && phoneNumber.matches("^09\\d{8}$");
    }
}
```

## See Also

- [Introduction to Jakarta Bean Validation :: Jakarta EE Tutorial :: Jakarta EE Documentation](https://jakarta.ee/learn/docs/jakartaee-tutorial/current/beanvalidation/bean-validation/bean-validation.html)
- [Spring Boot - Data and Field Validation using jakarta.validation.constraints - GeeksforGeeks](https://www.geeksforgeeks.org/spring-boot-data-and-field-validation-using-jakarta-validation-constraints/)
- [Request Body and Parameter Validation with Spring Boot](https://www.geeksforgeeks.org/request-body-and-parameter-validation-with-spring-boot/)
