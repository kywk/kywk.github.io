---
title: GitLab 備份腳本
date_created: 2021-05-31T16:15:28+08:00
categories:
  - DevSecOps
tags:
  - Bash
  - GitLab
  - DevSecOps
hide_table_of_contents: false
draft: true
---

# GitLab 備份腳本

自動化 GitLab 備份與異地同步腳本（使用 Docker exec、rsync 與 SSH 遠端管理）。

```bash
#!/bin/sh

REMOTE_HOST='X.X.X.X'

echo "Starting to back up gitlab data"

# gitlab backup except configuration files
sudo docker exec -t gitlab gitlab-backup create GZIP_RSYNCABLE=yes GITLAB_BACKUP_MAX_CONCURRENCY=4

# get gitlab backed up data
GITLAB_BACKUP_FILE=`sudo ls /home/gitlab/data/gitlab/data/backups -lat | head -3 | tail -1 | awk '{print $9}'`
GITLAB_BACKUP_FILEPATH=/home/gitlab/data/gitlab/data/backups/$GITLAB_BACKUP_FILE
echo "gitlab backup file path:$GITLAB_BACKUP_FILEPATH"

echo "Creating the backup directory"
mkdir ~/gitlab_backups

echo "Copying gitlab backed up data to the backup directory"
sudo cp "${GITLAB_BACKUP_FILEPATH}" ~/gitlab_backups

echo "Copying gitlab config data to the backup directory"
sudo cp -avr /home/gitlab/data/gitlab/config/ ~/gitlab_backups

sudo chmod 777 -R ~/gitlab_backups

echo "Copying the backup directory to the backup machine"
rsync -avzhe ssh --progress ~/gitlab_backups root@$REMOTE_HOST:/home/gitlab/gitlab_backups/

# test if upload success 
if ssh root@$REMOTE_HOST stat /home/gitlab/gitlab_backups/gitlab_backups/$GITLAB_BACKUP_FILE > /dev/null 2>&1
    then
        BACKUP_RESULT="GitLab backup & uploaded success."
        BACKUP_PATH="Your backup file was stored at ${REMOTE_HOST}/home/gitlab/gitlab_backups/gitlab_backups/${GITLAB_BACKUP_FILE}"

        echo "Cleanup local and remote older backup files"
        sudo rm -rf $GITLAB_BACKUP_FILEPATH
        ssh root@$REMOTE_HOST 'find /home/gitlab/gitlab_backups/gitlab_backups/ -iname "*.tar" -mtime +8 -exec rm {} \;'
        rm -rf /home/gitlab/data/gitlab/data/backups/*
    else
        BACKUP_RESULT="GitLab backup upload fail"
        BACKUP_PATH="Upload fail. You can find backup file at /home/gitlab/data/gitlab/data/backups/${GITLAB_BACKUP_FILE}"
fi

echo "Clearing the backup directory at the source machine"
sudo rm -rf ~/gitlab_backups

# sendmail
RECEIVER="ADMIN@GMAIL.COM"
SENDER=$(whoami)
LOCAL_FS=$(df -h | grep /dev/mapper/centos-root)
REMOTE_FS=$(ssh root@${REMOTE_HOST} 'df -h | grep /dev/mapper/centos-home')
MAIL_TXT="Subject: $BACKUP_RESULT\nFrom: $SENDER\nTo: $RECEIVER\n\n$BACKUP_PATH\n\nGitLab Server disk usage:\n$LOCAL_FS\n\nBackup server disk usage:\n$REMOTE_FS"
echo -e $MAIL_TXT | sendmail -t
```

### Reference

- [GitLab Backup Script Gist](https://gist.github.com/kywk/6edfac4eb495046b835d750b466f0081)
- [linux - check if file exists on remote host with ssh - Stack Overflow](https://stackoverflow.com/questions/12845206/check-if-file-exists-on-remote-host-with-ssh)
- [Delete files older than X days on remote server with SCP/SFTP - Server Fault](https://serverfault.com/questions/184586/delete-files-older-than-x-days-on-remote-server-with-scp-sftp)
- [timestamp - How can I change the date modified/created of a file? - Ask Ubuntu](https://askubuntu.com/questions/62492/how-can-i-change-the-date-modified-created-of-a-file)
- [email - Sending a mail from a linux shell script - Stack Overflow](https://stackoverflow.com/questions/5155923/sending-a-mail-from-a-linux-shell-script)
