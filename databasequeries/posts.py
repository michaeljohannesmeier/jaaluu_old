import facebook
oauth_access_token = "bff443dd259867883656818ef39590d7"
graph = facebook.GraphAPI(oauth_access_token)
# me = "****"
# profile = graph.get_object(me)
# graph.put_object(me, "feed", message="I am writing on my wall!")

graph.put_object(parent_object='me', connection_name='feed', message='Hello, world')