#!/bin/bash

if [ $# -lt 1 ]; then
    echo "Usage: $0 <argument1> <argument2> [additional arguments...]"
    exit 1
fi

npx shadcn-ui@latest add "$@"