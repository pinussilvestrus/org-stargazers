# org-stargazers

List stargazer counts for all repositories inside a GitHub organization.

![Build Status](https://github.com/pinussilvestrus/org-stargazers/workflows/ci/badge.svg) ![Version](https://img.shields.io/npm/v/org-stargazers.svg) 


## Install

```sh
$ npm i -g org-stargazers
```

## Usage

To list all stars by repository for given GitHub organization

```sh
$ org-stargazers -o 'bpmn-io'
```

To list only top 10 repositories

```sh
$ org-stargazers -t 10 -o 'bpmn-io'
```

## Help

```sh
$ org-stargazers -h
```

## Releasing

We use [`np`](https://github.com/sindresorhus/np) for releasing new versions

```sh
$ npm i -g np
$ np
```
