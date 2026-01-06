---
title: "NGINX: container tips"
description: "NGINX: container tips"
tags:
  - Infrastructure
  - NGINX
  - Docker
hide_table_of_contents: true
date_created: 2023-01-04T00:00:00.000Z
date_updated: 2023-01-04T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /devsecops/infrastructure/nginx-docker-tips/
---

# [Nginx] Container Tips

## Basic Usage

### Quick Start

```bash
# Run nginx with default config
docker run -d -p 80:80 --name nginx-server nginx

# Run with custom HTML
docker run -d -p 80:80 -v /host/html:/usr/share/nginx/html nginx

# Run with custom config
docker run -d -p 80:80 -v /host/nginx.conf:/etc/nginx/nginx.conf nginx
```

### Common Port Mappings

```bash
# HTTP only
docker run -d -p 80:80 nginx

# HTTPS only
docker run -d -p 443:443 nginx

# Both HTTP and HTTPS
docker run -d -p 80:80 -p 443:443 nginx

# Custom ports
docker run -d -p 8080:80 -p 8443:443 nginx
```

## Config file

### Mount Configuration Files

```bash
# Mount main config
docker run -d -p 80:80 \
  -v /host/nginx.conf:/etc/nginx/nginx.conf \
  nginx

# Mount config directory
docker run -d -p 80:80 \
  -v /host/nginx:/etc/nginx \
  nginx

# Mount sites config
docker run -d -p 80:80 \
  -v /host/sites:/etc/nginx/conf.d \
  nginx
```

### SSL/TLS Certificates

```bash
# Mount SSL certificates
docker run -d -p 443:443 \
  -v /host/ssl:/etc/nginx/ssl \
  -v /host/nginx.conf:/etc/nginx/nginx.conf \
  nginx
```

### Reload Nginx Inside Docker Container

1.  Find your container name
    Use docker ps to find your nginx container.

2.  Reload Nginx
    With `docker exec -it {container_name} {command}` you can directly access your container and execute commands. In my case the name of the container is nginx-server.

    ```bash
    $ docker exec -it nginx-server nginx -s reload
    2016/08/18 09:52:38 [notice] 19#19: signal process started
    $ docker exec -it nginx-server nginx -s reload
    2016/08/18 09:52:38 [notice] 19#19: signal process started
    ```

## Docker Compose

### Basic Setup

```yaml
version: "3.8"
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./html:/usr/share/nginx/html
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    restart: unless-stopped
```

### With Custom Dockerfile

```yaml
version: "3.8"
services:
  nginx:
    build: .
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
```

```dockerfile
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY sites/ /etc/nginx/conf.d/
EXPOSE 80 443
```

## Troubleshooting

### Check Nginx Status

```bash
# Check if nginx is running
docker exec nginx-server nginx -t

# View nginx processes
docker exec nginx-server ps aux | grep nginx

# Check nginx version
docker exec nginx-server nginx -v
```

### View Logs

```bash
# View access logs
docker exec nginx-server tail -f /var/log/nginx/access.log

# View error logs
docker exec nginx-server tail -f /var/log/nginx/error.log

# View all logs
docker logs nginx-server
```

### Common Issues

```bash
# Permission issues - fix ownership
docker exec nginx-server chown -R nginx:nginx /usr/share/nginx/html

# Config syntax check
docker exec nginx-server nginx -t

# Restart nginx process
docker exec nginx-server nginx -s reload
```

## Best Practices

### Security

```bash
# Run as non-root user
docker run -d --user nginx nginx

# Limit resources
docker run -d --memory=512m --cpus=0.5 nginx

# Read-only root filesystem
docker run -d --read-only --tmpfs /var/cache/nginx nginx
```

### Performance

```bash
# Use alpine for smaller image
docker run -d nginx:alpine

# Mount cache as tmpfs
docker run -d --tmpfs /var/cache/nginx nginx
```

## See Also

- [nginx - Official Image | Docker Hub](https://hub.docker.com/_/nginx)
- [Reload Nginx Inside Docker Container – Tobias Forkel – Blog – PHP / Magento Developer located in Melbourne, Australia](http://blog.tobiasforkel.de/en/2016/08/18/reload-nginx-inside-docker-container/)
- [Docker Nginx Tutorial | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-run-nginx-in-a-docker-container-on-ubuntu-14-04)
- [Nginx Docker Best Practices](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-docker/)
