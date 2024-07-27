# Aiguillage Documentation

This project is meant to be a template for future Web/Go projects.

## Getting started

Aiguillage is packaged as a Docker application that you can run anywhere docker runs.

- The data used by aiguillage is stored in `/aiguillage.db` inside the Docker. This is an SQLite file that you can edit yourself if you want.
- Aiguillage uses itself for its configuration. You might need to restart the docker for the changes to take effect.

The aiguillage image respect your disk space and uses 10Mb of space (a barebones nodejs image already weights 40Mb).

You can use Aiguillage without Docker by building the Go application and putting the compiled web application into a `serve` folder next to the Go app.
Checkout the Docker file for details.

Run with docker:
```bash
docker build .
# Run the image you obtained
```

Run with docker-compose:
```yaml
docker-compose up -d
```