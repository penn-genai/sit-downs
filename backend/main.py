from llm import llm


text="""
<body><a href="https://about.google">About</a><a href="https://store.google.com">Store</a><a href="https://mail.google.com">Gmail</a><a href="https://www.google.com">Images</a><a href="https://www.google.com"><svg><path></path><image src="https://ssl.gstatic.com/gb/images/bar/al-icon.png" alt=""></image></svg></a><a href="https://accounts.google.com"></a><img alt="Google" src="/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png"><dialog><button></button></dialog><form>  <textarea title="Search"></textarea>            <svg><path></path><path></path><path></path><path></path></svg><svg><rect></rect><g><circle></circle><circle></circle><path></path><path></path><path></path></g></svg>Choose what you’re giving feedback on<ul></ul><li><img alt=""><img alt=""><img alt=""><hr>Delete</li><li><img alt=""><img alt=""><img alt=""></li><li>Delete</li><img alt=""><img alt=""><img alt=""><li></li>  <center> <input> <input>  </center> Report inappropriate predictions  <center> <input>  <input> </center>      <input><input><input><input></form><a href="https://www.google.com">Advertising</a><a href="https://www.google.com">Business</a><a href="https://google.com"> How Search works </a><a href="https://sustainability.google"><img alt=""></a><a href="https://policies.google.com">Privacy</a><a href="https://policies.google.com">Terms</a><textarea></textarea>Google apps</body>
"""


model = llm()
print(model.summarize_webpage(text))