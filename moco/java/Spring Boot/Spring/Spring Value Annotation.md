---
title: Value Annotation
description: 'Spring Core Basics: Value Annotation'
tags:
  - SpringBoot
  - Tutorial
  - SpringBoot/CoreBasics
  - SpringBoot/Annotation
  - SpringBoot/Properties
date_created: 2023-08-20T00:00:00.000Z
date_updated: 2023-08-20T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /java/spring-boot/spring/spring-value-annotation/
---

[Spring] @Value Annotation
==========================

> Src: [A Quick Guide to Spring @Value | Baeldung](https://www.baeldung.com/spring-value-annotation)
> Noted: 2023-08-23


Overview
--------

The __@Value Spring annotation__ can be used for injecting values into fields in Spring-managed beans,
and it can be applied at the field or constructor/method parameter level.


Setting Up the Application
--------------------------

To configure a simple Spring application configuration class for describe this annotation.
We needs __a properties file__ to define the values we want to inject with the _@Value_ annotation.
And so, we'll first need to define a _@PropertySource_ in our configuration class — with the properties file name.

Let's define the properties file:

``` ini
value.from.file=Value got from the file
priority=high
listOfValues=A,B,C
```


Usage Examples
--------------

### Valued ###

As a basic and mostly useless example, we can only inject “string value” from the annotation to the field:

``` java
@Value("string value")
private String stringValue;
```

上面語法在 annotation 直接給值, 將 stringValue 設為 "string value",
效果和 `private String stringValue = "string value"` 是一樣的.
實務上並無使用 annotation 的意義.

### PropertySource ###

Using the _@PropertySource_ annotation allows us to work with values from properties files with the _@Value_ annotation.

In the following example, we get _Value got from the file_ assigned to the field:

``` java
@Value("${value.from.file}")
private String valueFromFile;
```

類似 BASH 的字串處理, 字串中的 `${VARIABLE}` 會先行解析為對應的值.
而 Spring Framework 中會找尋 application properties 是否存在對應的 Key.

### System properties ###

We can also set the value from system properties with the same syntax.

Let's assume that we have defined a system property named _systemValue_:

``` java
@Value("${systemValue}")
private String systemValue;
```

### Default value ###

Default values can be provided for properties that might not be defined.
Here, the value _some default_ will be injected:

``` java
@Value("${unknown.param:some default}")
private String someDefault;
```

@Value annotation 各種物件 default value 的進一步介紹可參考 [[Spring Value Defaults|@Value Defaults]]


### Properties priority ###

If the same property is defined as a system property and in the properties file, then the system property would be applied.

Suppose we had a property _priority_ defined as a system property with the value _System property_ and
defined as something else in the properties file. The value would be _System property_:

``` java
@Value("${priority}")
private String prioritySystemProperty;
```

在 Sprint Framework 中, System property 的優先度高於其他設定, 若有多個 property 中有相同名字, 會以 System property 為引用的值.

### List / Array ###

To inject a bunch of values, it would be convenient to define them as comma-separated values for the single property
in the properties file or as a system property and to inject into an array.

In the first section, we defined comma-separated values in the _listOfValues_ of the properties file,
so the array values would be [“A”, “B”, “C”]:

``` java
@Value("${listOfValues}")
private String[] valuesArray;
```


## 進階範例與 SpEL

我們也可以使用 [[Spring SpEL Expressions|SpEL 表達式]] 來獲取值。

### 系統屬性存取

如果我們有一個名為 priority 的系統屬性，其值將被應用到欄位：

```java
@Value("#{systemProperties['priority']}")
private String spelValue;
```

如果我們沒有定義系統屬性，則會分配 null 值。

> 上述語法讀取 systemProperties 中的 priority 來注入使用。
> 透過 SpEL 來讀取 property 可避免多個 property 有相同 key 導致執行時錯誤。

若 PropertySource 中有 priority 的值為 "propertySource priority"，
而 systemProperty 中找不到 priority：

```java
@Value("${priority}")
private String priorityProperty;

@Value("#{systemProperties['priority']}")
private String spelValue;
```

priorityProperty 的值為 "propertySource priority"，
而 spelValue 為 null。

### SpEL 預設值

SpEL 表達式中的預設值語法較為複雜，如果系統屬性未定義，則為欄位提供 some default 值：

```java
@Value("#{systemProperties['unknown'] ?: 'some default'}")
private String spelSomeDefault;
```

### 從其他 Bean 獲取值

假設我們有一個名為 someBean 的 bean，其欄位 someValue 等於 10。
那麼，10 將被分配給該欄位：

```java
@Value("#{someBean.someValue}")
private Integer someBeanValue;
```

### SpEL 列表處理

我們可以操作屬性來獲取值的 List，這裡是字串值 A、B 和 C 的列表：

```java
@Value("#{'${listOfValues}'.split(',')}")
private List<String> valuesList;
```


Using @Value With Maps
----------------------

We can also use the _@Value_ annotation to inject a _Map_ property.

First, we'll need to define the property in the `{key: ‘value' }` form in our properties file:

``` ini
valuesMap={key1: '1', key2: '2', key3: '3'}
```

__Note that the values in the Map must be in single quotes.__

Now we can inject this value from the property file as a _Map_:

``` java
@Value("#{${valuesMap}}")
private Map<String, Integer> valuesMap;
```

If we need __to get the value of a specific key__ in the Map,
all we have to do is __add the key's name in the expression__:

``` java
@Value("#{${valuesMap}.key1}")
private Integer valuesMapKey1;
```

If we're not sure whether the _Map_ contains a certain key, we should choose
_a safer expression that will not throw an exception but set the value to null_
when the key is not found:

``` java
@Value("#{${valuesMap}['unknownKey']}")
private Integer unknownMapKey;
```

We can also __set default values for the properties or keys that might not exist__:

``` java
@Value("#{${unknownMap : {key1: '1', key2: '2'}}}")
private Map<String, Integer> unknownMap;

@Value("#{${valuesMap}['unknownKey'] ?: 5}")
private Integer unknownMapKeyWithDefaultValue;
```

__Map entries can also be filtered__ before injection.

Let's assume we need to get only those entries whose values are greater than one:

``` java
@Value("#{${valuesMap}.?[value>'1']}")
private Map<String, Integer> valuesMapFiltered;
```

We can also use the _@Value annotation_ to __inject all current system properties__:

``` java
@Value("#{systemProperties}")
private Map<String, String> systemPropertiesMap;
```


Using @Value With Constructor Injection
---------------------------------------

When we use the _@Value_ annotation, we're not limited to a field injection.
__We can also use it together with constructor injection__.

Let's see this in practice:

``` java
@Component
@PropertySource("classpath:values.properties")
public class PriorityProvider {

    private String priority;

    @Autowired
    public PriorityProvider(@Value("${priority:normal}") String priority) {
        this.priority = priority;
    }

    // standard getter
}
```

In the above example, we inject a _priority_ directly into our _PriorityProvider_‘s constructor.

Note that we also provide a default value in case the property isn't found.


Using @Value With Setter Injection
----------------------------------

Analogous to the constructor injection, __we can also use _@Value_ with setter injection__.

Let's take a look:

``` java
@Component
@PropertySource("classpath:values.properties")
public class CollectionProvider {

    private List<String> values = new ArrayList<>();

    @Autowired
    public void setValues(@Value("#{'${listOfValues}'.split(',')}") List<String> values) {
        this.values.addAll(values);
    }

    // standard getter
}
```

We use the SpEL expression to inject a list of values into the _setValues_ method.


Using @Value With Records
-------------------------

Java 14 introduced [records](https://www.baeldung.com/java-record-keyword) to facilitate the creation of an immutable class.
__The Spring framework supports _@Value_ for record injection since version 6.0.6__:

``` java
@Component
@PropertySource("classpath:values.properties")
public record PriorityRecord(@Value("${priority:normal}") String priority) {}
```

Here, we inject the value directly into the record's constructor.


Conclusion
----------

This article examined the various possibilities of using the _@Value annotation_ with simple properties defined in the file,
with system properties, and with properties calculated with SpEL expressions.

As always, the example application is available on the [GitHub project][GitHub project].


See Also
--------

- [GitHub project][GitHub project]
- [[Spring Value Defaults|Value Defaults]]


[GitHub project]: https://github.com/eugenp/tutorials/tree/master/spring-boot-modules/spring-boot-properties-2
