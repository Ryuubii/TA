import json
from get_posts_from_user_hashtag import get_posts_from_user_hastag

print(json.dumps(get_posts_from_user_hastag('genshinimpact', 'nilou'), indent=4))
