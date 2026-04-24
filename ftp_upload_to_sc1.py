#!/usr/bin/env python3
import os
import ftplib

# Upload sc2/out/ to sc1/public_html/ (overwrites existing, keeps orphans)
# Fast mode: no deletion, avoids FTP timeout on sc1

ftp = ftplib.FTP('sc1bovu7233.universe.wf', 'sc1bovu7233', 'RoxanPascalSteven2024')
ftp.cwd('public_html')

local_root = '/Users/stv/Documents/zed/icia-sc2/out'

def upload_recursive(local_path):
    items = sorted(os.listdir(local_path))
    for item in items:
        local_full = os.path.join(local_path, item)
        if os.path.isdir(local_full):
            try:
                ftp.cwd(item)
            except:
                ftp.mkd(item)
                ftp.cwd(item)
            upload_recursive(local_full)
            ftp.cwd('..')
        else:
            ext = os.path.splitext(item)[1]
            if item == '.htaccess' or ext in ['.html', '.js', '.css', '.json', '.png', '.jpg', '.svg', '.webp', '.txt', '.xml', '.gz', '.pdf', '.ico', '.woff2', '.woff', '.ttf', '.eot']:
                print(f'Uploading {item}')
                with open(local_full, 'rb') as f:
                    ftp.storbinary(f'STOR {item}', f)

upload_recursive(local_root)
ftp.quit()
print('Done!')
