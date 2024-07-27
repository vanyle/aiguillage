<h1 align="center">🚇 Aiguillage</h1>

<p align="center">
  <i>Tiny Configuration provider for micro services with a GUI.</i>
</p>
<p align="center">
  <a href="https://github.com/vanyle/aiguillage/"><img src="https://img.shields.io/github/stars/aiguillage/aiguillage?style=social" alt="GitHub Stars"></a>
</p>
<hr class="solid">

## The concept

- Deploy Aiguillage on a single machine with a fixed IP/Hostname
- Aiguillage provides a GUI where you can see your services and their configuration
- Services can register themselves
- You can edit the configuration of a service
- Services can post logs and you can view these logs.
- A service can have multiple version and you can set per-version configuration
- A configuration is a key, value pair.
- An empty value ("") is the same as no value.

Aiguillage is packaged as a ~10Mb docker image and can be deployed on environments with limited resources.

## Example of use cases

- Providing secrets/environment variables to applications and being able to switch them easily
- Easily distinguishing between production, testing and local environment and managing the config for all of them
- Changing the database used by a service by changing the underlying IP used.
- Toggling feature flags on or off quickly
- Seeing logs of all your application in one centralized place

## Getting started

On a machine with docker installed, run:
```bash
git clone https://github.com/vanyle/aiguillage
docker-compose up
```

More information in [the documentation](./DOC.md)

## Usage

A Go SDK is provided that services can use to register themselves, get/set their config and post logs.
These feature only use HTTP REST request so you can easily implement them yourself.

