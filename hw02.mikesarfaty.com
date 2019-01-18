server {
        listen 80;
        listen [::]:80;

        root /home/mikesarfaty/www/main/hw02.mikesarfaty.com;

        index index.html;

        server_name hw02.mikesarfaty.com www.hw02.mikesarfaty.com;

        location / {
                try_files $uri $uri/ =404;
        }
}
