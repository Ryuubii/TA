import instaloader
from instaloader_instance import instaloader_instance
from itertools import filterfalse
import json
L = instaloader_instance()


def get_posts_from_user_hastag(username, hashtag):
    profile = instaloader.Profile.from_username(L.context, username)
    posts = profile.get_posts()

    postlist = []

    i = 0
    for post in filterfalse(lambda p: hashtag not in p.caption_hashtags, posts):
        if i < 3:
            i += 1

            commentors = []
            j = 0
            for comment in post.get_comments():
                if j < 3:
                    j += 1
                    commentors.append({
                        "user_id": comment.owner.userid,
                        "username": comment.owner.username,
                        "is_user_a_business":  comment.owner.is_business_account,
                    })

            likes = []
            k = 0
            for like in post.get_likes():
                if k < 3:
                    k += 1
                    likes.append({
                        "user_id": like.userid,
                        "username": like.username,
                        "is_user_a_business":  like.is_business_account,
                    })

            postlist.append({
                "hashtags": post.caption_hashtags,
                "mentions": post.caption_mentions,
                "commentors": commentors,
                "likes": likes,
                "post_owner_id": post.owner_profile.userid,
                "post_owner_username": post.owner_username,
                "is_user_a_business": post.owner_profile.is_business_account
            })

    return postlist
