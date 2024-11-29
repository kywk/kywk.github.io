---
title: Value Defaults
description: "Spring Core Basics: Value Defaults"
tags:
  - SpringBoot
  - Tutorial
  - SpringBoot/CoreBasics
  - SpringBoot/Properties
date_created: 2023-08-23
date_update: 2023-08-23
cover: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

[Spring] @Value Defaults
========================

> Src: [Using Spring @Value with Defaults | Baeldung](https://www.baeldung.com/spring-value-defaults)  
> Noted: 2023-08-23

Overview
--------

Spring's _@Value_ annotation provides a convenient way to inject property values into components. 
It's also quite useful to __provide sensible defaults for cases where a property may not be present__ 
— how to specify a default value for the @Value Spring annotation.


String Defaults
---------------

Let's look at the basic syntax for setting a default value for a _String property_:

``` java 
@Value("${some.key:my default value}")
private String stringWithDefaultValue;
```

If _some.key_ cannot be resolved, _stringWithDefaultValue_ will be set to the default value of _my default value_.

Similarly, we can set a _zero-length String_ as the default value:

``` java
@Value("${some.key:}")
private String stringWithBlankDefaultValue;
```

@Value annotation `:` 後面即為 default value. 沒有給任何值的話並不為 `null`, 而因不同物件會有不同資料內容.
String 的話會是空字串 `""`


Primitives
----------

To set a default value for primitive types such as _boolean_ and _int_, we use the literal value:

``` java 
@Value("${some.key:true}")
private boolean booleanWithDefaultValue;
```

``` java
@Value("${some.key:42}")
private int intWithDefaultValue;
```

If we wanted to, we could use primitive wrappers instead by changing the types to _Boolean_ and _Integer_.


Arrays
------

We can also inject a comma `,` separated list of values into an array:

``` java
@Value("${some.key:one,two,three}")
private String[] stringArrayWithDefaults;

@Value("${some.key:1,2,3}")
private int[] intArrayWithDefaults;
```

In the first example above, the values _one_, _two_ and _three_ are injected as defaults into _stringArrayWithDefaults_.


Using SpEL
----------

We can also use Spring Expression Language (SpEL) to specify an expression and a default.

In the example below, we expect _some.system.key_ to be set as a system property, 
and if it is not set, we want to use _my default system property_ value as a default:

``` java
@Value("#{systemProperties['some.key'] ?: 'my default system property value'}")
private String spelWithDefaultValue;
```


Conclusion
----------

Spring @Value 裡面的的格式規範類似 YAML, 用 `,` 區隔陣列元素, 非必要並無須特別加上 `""` ... 等.
但若字串中有混雜特殊字元等導致誤判, 可利用 `'` 單引號來定義字串.

This article looked at how to set a default value for a property whose value we would like to have injected using Spring's _@Value_ annotation.

As usual, all the code samples used in this article can found in the [GitHub project][GitHub project].


See Also
--------

- [GitHub project][GitHub project]
- [@Value Annotation](./spring_value-annotation.md)


[GitHub project]: https://github.com/eugenp/tutorials/tree/master/spring-boot-modules/spring-boot-properties-2
