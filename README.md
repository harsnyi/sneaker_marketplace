# sneaker_marketplace👟

## Kliens

## Szerver

### Virtuális környezet létrehozása

```console
python3 -m venv .\server\venv
cd .\server\venv
. .\Scripts\activate
pip install -r ..\requirements.txt
```

### Virtuális környezet indítása

```console
cd .\server\venv
. .\Scripts\activate
python .\sneaker_api\manage.py runserver
```

## Jogosultságok

```diff
+ User : 5001
! Contributor : 6002
- Admin : 8004
```
