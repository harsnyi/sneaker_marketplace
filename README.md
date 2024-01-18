# sneaker_marketplace👟

## Kliens

## Szerver

### Virtuális környezet létrehozása

```console
home@user:~$ python3 -m venv .\server\venv
home@user:~$ cd .\server\venv
home@user:~$ . .\Scripts\activate
home@user:~$ pip install -r ..\requirements.txt
```

### Virtuális környezet indítása

```console
home@user:~$ cd .\server\venv
home@user:~$ . .\Scripts\activate
home@user:~$ python .\sneaker_api\manage.py runserver
```

## Jogosultságok

```diff
+ User : 5001
! Contributor : 6002
- Admin : 8004
```
