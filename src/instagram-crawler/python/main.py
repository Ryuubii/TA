import sys
import json
from get_posts_from_user_hashtag import get_posts_from_user_hastag


def main(cmd_args):
    mode = cmd_args[0]
    match mode:
        case 'get_posts':
            print(json.dumps(get_posts_from_user_hastag(
                cmd_args[1], cmd_args[2]), indent=4))


main(sys.argv[1:])
