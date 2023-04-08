import bcrypt

def hasd_pwd (pwd : str):
    bytes = pwd.encode('utf-8')
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes,salt)

    return hash.decode()

def check_pwd(pwd: str, hashed_pwd: str):
    pwd_bytes = pwd.encode("utf-8")
    hashed_pwd_bytes = hashed_pwd.encode("utf-8")
    result = bcrypt.checkpw(pwd_bytes, hashed_pwd_bytes)
    return result