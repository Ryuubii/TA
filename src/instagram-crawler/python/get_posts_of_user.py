import os
import instaloader
from datetime import datetime
from instaloader_instance import instaloader_instance

L = instaloader_instance()


def get_posts_of_user(username):
    posts = instaloader.Profile.from_username(L.context, username).get_posts()

    SINCE = datetime(2023, 2, 10)
    UNTIL = datetime(2023, 2, 15)
    k = 0

    postlist = []

    for post in posts:
        postdate = post.date

        if postdate > UNTIL:
            continue
        elif postdate <= SINCE:
            k += 1
            if k == 50:
                break
            else:
                continue
        else:
            postlist.append({
                "post_title": post.title,
                "number_of_comments": post.comments,
                "number_of_likes": post.likes,
                "hashtags": post.caption_hashtags,
                "mentions": post.caption_mentions
            })
            # likes = post.get_likes()
            # comments = post.get_comments()
            # hashtags = post.caption_hashtags
            # mentions = post.caption_mentions
            # tagged_users = post.caption_tagged_users
            # Use these to get likes, comments, etc
    return postlist
