---
title: "NGINX: container tips"
description: "NGINX: container tips"
tags: [Infra, NGINX, Docker]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

hide_table_of_contents: true

created: 2023-01-04
updated: 2023-01-04
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

[Nginx] Container Tips
======================

Config file
-----------

mount nginx configuration files

### Reload Nginx Inside Docker Container

1.  Find your container name
    Use docker ps to find your nginx container.

2.  Reload Nginx
    With `docker exec -it {container_name} {command}` you can directly access your container and execute commands. In my case the name of the container is nginx-server.

    ``` bash
    $ docker exec -it nginx-server nginx -s reload
    2016/08/18 09:52:38 [notice] 19#19: signal process started
    $ docker exec -it nginx-server nginx -s reload
    2016/08/18 09:52:38 [notice] 19#19: signal process started
    ```


Docker Compose
--------------



See Also
--------

- [nginx - Official Image | Docker Hub](https://hub.docker.com/_/nginx)
- [Reload Nginx Inside Docker Container – Tobias Forkel – Blog – PHP / Magento Developer located in Melbourne, Australia](http://blog.tobiasforkel.de/en/2016/08/18/reload-nginx-inside-docker-container/)
