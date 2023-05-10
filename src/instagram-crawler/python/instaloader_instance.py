from datetime import datetime
from dotenv import load_dotenv
import os
import instaloader

load_dotenv()

# username = os.getenv("INSTA_USERNAME")
# password = os.getenv("INSTA_PASSWORD")


def instaloader_instance():
    L = instaloader.Instaloader(quiet=True)
    # L.login(username, password)
    # L.load_session_from_file(
    #     username, filename="src/instagram-crawler/python/cookie.bin")
    return L
