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
slug: /java/packages/Jakarta-Validation/
---

# Jakarta Bean Validation

> 後端開發 API 時, 常需要對 Request 欄位最條件檢核, Ex: Not NULL, 僅限數字, 長度限制... 等.
> 尤其若串接資料庫時, 欄位檢核更是必要的.
>
> Node.js Express 開發常搭配 Express-Validator middleware 來簡化資料欄位基本驗證的 coding 瑣事,
> 查找 SpringBoot 是否也有類似的 middleware 時, 發現 `Jakarta Bean Validation` 這個更好用的套件.

## Overview

`Jakarta Bean Validation`

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

## @RequestBody @Valid annotation

##

## See Also

- [Introduction to Jakarta Bean Validation :: Jakarta EE Tutorial :: Jakarta EE Documentation](https://jakarta.ee/learn/docs/jakartaee-tutorial/current/beanvalidation/bean-validation/bean-validation.html)
- [Spring Boot - Data and Field Validation using jakarta.validation.constraints - GeeksforGeeks](https://www.geeksforgeeks.org/spring-boot-data-and-field-validation-using-jakarta-validation-constraints/)
- [Request Body and Parameter Validation with Spring Boot](https://www.geeksforgeeks.org/request-body-and-parameter-validation-with-spring-boot/)
