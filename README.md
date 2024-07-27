# Aiguillage

Configuration provider for micro services.

## Concept

- Deploy Aiguillage on a single machine with a fixed IP/Hostname
- Aiguillage provides a GUI where you can browse through your services and their configuration
- Services can register themselves
- You can edit the configuration of a service
- Services can post logs and you can view these logs.
- A service can have multiple version and you can set per-version configuration
- A configuration is a set of key, value pairs
- An empty value ("") is the same as no value.

## Example of use cases

- Providing secrets/environment variables to applications and being able to switch them easily
- Easily distinguishing between production, testing and local environment and managing the config for all of them
- Changing the database used by a service by changing the underlying IP used.

## Usage

A Go SDK is provided that services can use to register themselves, get/set their config and post logs.
These feature only use HTTP REST request so you can easily implement them yourself.

## Special config keys

Some config keys have a special effect in the GUI, they all start with `display-`

- `display-url`: If set, a link to this url will be displayed on the service card.
- `display-color`: If set, the card will have this color
- `display-description`: If set, this will be used when searching for services.

## Technical aspects

Aiguillage is designed to manage at most 100 000 services. It uses a single non-distributed sqlite database to store the configurations and services.
It is not designed to be deployed on multiple instances, however, it should scale well vertically.

While you could probably scale beyond that if you don't use the log feature or the routes returning the whole list of services,
it is a bad idea and you should use a more custom solution.

If you have more than 100 000 services, you probably have enough engineers to build you own better solution.
