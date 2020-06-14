**RIoT Api**

```
Routes
```

- Admin

  - [GET] all admins
    > /admin/
  - [POST] create admin
    > /admin/create/
    ```
    Body: { nome: "", email: "", senha: "" }
    ```

- Project
  - [GET] project by admin
    > /project/:id_admin
  - [GET] info project
    > /project/info/:id_project
  - [POST] create project
    > /project/create/
    ```
    Body: { nome: "", tipo: "", dominio: "", descricao: "", id_admin: "" }
    ```
