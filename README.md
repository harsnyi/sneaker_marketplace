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
* Guest : 4001
! User : 5002
- Contributor : 6003
+ Admin : 7004
```
