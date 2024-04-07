---
title: Stoplight Prism
description: Stoplight Prism OpenAPI mock / testing framework
tags:
  - OpenAPI
sidebar_position: 60
date_created: 2023-01-04
date_updated: 2023-01-04
image: https://i.imgur.com/mErPwqL.png
---

Stoplight Prism
================

[stoplightio/prism: Turn any OpenAPI2/3 and Postman Collection file into an API server with mocking, transformations and validations.](https://github.com/stoplightio/prism)


Installation
------------


### customize fakejs


Run as container
----------------

stoplight/prism 官方有提供 docker image:
[stoplight/prism - Docker Image | Docker Hub](https://hub.docker.com/r/stoplight/prism)

但 Docker Hub 相關說明卻並不是為 docker 使用而寫, 而是在 Github 專案上的 README.md

### Create docker image & run it

``` Dockerfile
FROM stoplight/prism:4
ADD api-spec.json /usr/src/prism/
EXPOSE 4010
CMD ["mock","-h","'0.0.0.0'","/usr/src/prism/api-spec.json"]
```

### Use external OpenAPI file


### Add custom fake wording





See Also
--------

- [Stoplight Prism - Creating Docker image with API specification embeded inside | Greater Than 0](https://www.greaterthan0.com/stoplight-prism-creating-docker-image-api-specification-embeded-inside)
