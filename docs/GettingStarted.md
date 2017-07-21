# [Croud Style Guide Docs](Introduction.md)

## Getting Started

Here you can find out how to get started using the style guide for your project or for contribution.

* [Installation](#installation)
    * [Installing for contribution](#installing-contribution)
    * [Installing for use](#installing-use)
* [Build Setup](#build-setup)
    * [Style Guide](#build-style)
    * [Technical Documentation](#build-tech)
    * [Semantic UI](#build-semantic)

<a name="installation"></a>
### Installation
There are two ways of installing croud style guide depending on whether you wish to contribute or if you are using it in your project.

<a name="installing-contribution"></a>
#### Installing for contribution:
If you wish to contribute to the project you will need to follow these steps.

Clone the GitHub repo by running:

    git clone https://github.com/croudsupport/croud-style-guide.git

Then in the root directory of your cloned repo run:
    
    yarn install
    
You are now ready to get to work. Look at [build setup](#build-setup) for a description of the various npm scripts.

<a name="installing-use"></a>
#### Installing for use:

To use in a project simply run:

    yarn add croud-style-guide --dev
Then run:
    
    yarn install

<a name="build-setup"></a>
### Build Setup
Use the following npm scripts after [installing for contribution](#installing-contribution) to run certain build processes.

<a name="build-style"></a>
#### Style Guide

```bash
# Serve with hot-reload at localhost:8080:
yarn run dev

# Rebuild changes made to config files
yarn run styleguide:build

# Watch for changes being made to style guide config files:
yarn run styleguide:watch

# Serve with hot-reload at localhost:8080
# with watch of style guide config:
yarn run dev:styleguide

# Build Changes made to the style guide:
yarn run build
```
<a name="build-tech"></a>
#### Technical Documentation

```bash
# Serve with hot-reload at localhost:6060:
yarn run tech

# Build Changes made to the tech docs:
yarn run tech:build
```
<a name="build-semantic"></a>
#### Semantic UI
```bash
# Rebuild Semantic UI
yarn run semantic:build
```