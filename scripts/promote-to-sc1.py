#!/usr/bin/env python3
import os
import ftplib
import sys

FTP_HOST = 'sc1bovu7233.universe.wf'
FTP_USER = 'sc1bovu7233'
FTP_PASS = 'RoxanPascalSteven2024'
REMOTE_DIR = 'public_html'
LOCAL_ROOT = '/Users/stv/Documents/zed/icia-sc2/out'

ALLOWED_EXTS = {'.html', '.js', '.css', '.json', '.png', '.jpg', '.svg', '.webp', '.txt', '.xml', '.gz', '.pdf', '.ico', '.woff2', '.woff', '.ttf', '.eot'}

def delete_all(ftp, path=''):
    """Recursively delete all files and directories in the current FTP directory."""
    try:
        items = ftp.nlst()
    except ftplib.error_perm as e:
        if '550' in str(e):
            return
        raise
    
    # Separate files and directories
    files = []
    dirs = []
    for item in items:
        if item in ('.', '..'):
            continue
        try:
            ftp.cwd(item)
            dirs.append(item)
            ftp.cwd('..')
        except ftplib.error_perm:
            files.append(item)
    
    # Delete files first
    for f in files:
        try:
            ftp.delete(f)
            print(f'  Deleted: {f}')
        except Exception as e:
            print(f'  Could not delete {f}: {e}')
    
    # Then recurse into directories and delete them
    for d in dirs:
        try:
            ftp.cwd(d)
            delete_all(ftp)
            ftp.cwd('..')
            ftp.rmd(d)
            print(f'  Deleted dir: {d}')
        except Exception as e:
            print(f'  Could not delete dir {d}: {e}')

def upload_recursive(ftp, local_path, remote_path=''):
    items = sorted(os.listdir(local_path))
    for item in items:
        local_full = os.path.join(local_path, item)
        if os.path.isdir(local_full):
            try:
                ftp.cwd(item)
            except:
                ftp.mkd(item)
                ftp.cwd(item)
            upload_recursive(ftp, local_full)
            ftp.cwd('..')
        else:
            if item == '.htaccess' or os.path.splitext(item)[1] in ALLOWED_EXTS:
                print(f'  Uploading {item}')
                with open(local_full, 'rb') as f:
                    ftp.storbinary(f'STOR {item}', f)

print("==========================================")
print("  PROMOTE sc2 -> sc1 (FTP statique)")
print("==========================================")
print(f"\nSource : {LOCAL_ROOT}")
print(f"Cible  : {FTP_HOST}/{REMOTE_DIR}")
print("")

# Verify source exists
if not os.path.exists(os.path.join(LOCAL_ROOT, 'index.html')):
    print("❌ Erreur : out/index.html introuvable.")
    print("   Fais d'abord : rm -rf out .next && NEXT_EXPORT=true npm run build")
    sys.exit(1)

# Confirm
confirm = input("Type YES pour tout effacer sc1 et uploader sc2 : ")
if confirm.strip() != "YES":
    print("❌ Annulé.")
    sys.exit(1)

print("\n🚀 Connexion FTP sc1...")
ftp = ftplib.FTP(FTP_HOST, FTP_USER, FTP_PASS)
ftp.cwd(REMOTE_DIR)

print("\n🗑️  Suppression de tout le contenu actuel de sc1...")
delete_all(ftp)

print("\n📤 Upload du nouveau contenu sc2...")
upload_recursive(ftp, LOCAL_ROOT)

ftp.quit()
print("\n✅ sc1 est maintenant le site bilingue FR/EN !")
