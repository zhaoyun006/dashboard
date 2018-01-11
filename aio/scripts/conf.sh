#!/usr/bin/env bash
# Copyright 2017 The Kubernetes Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

ROOT_DIR="$(cd $(dirname "${BASH_SOURCE}")/../.. && pwd -P)"
AIO_DIR="${ROOT_DIR}/aio"
I18N_DIR="${ROOT_DIR}/i18n"
NG_BIN="${ROOT_DIR}/node_modules/.bin/ng"
GULP_BIN="${ROOT_DIR}/node_modules/.bin/gulp"
TMP_DIR="${ROOT_DIR}/.tmp"
FRONTEND_DIR="${TMP_DIR}/frontend"
DIST_DIR="${ROOT_DIR}/dist"
