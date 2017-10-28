# RecipeV4

1. 设置firebase权限
```
auth != null
```
2. 在接口中传递token否则会报错
```
Response {_body: "{↵  "error" : "Permission denied"↵}↵", status: 401, ok: false, statusText: "Unauthorized", headers: Headers, …}
```