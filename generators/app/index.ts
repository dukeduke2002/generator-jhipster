/**
 * Copyright 2013-2024 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * index.js文件就是generator的主要代码，执行 yo name其实就是执行app/index.js，
 * 而如果有其他的子命令，可在app下面建同级目录，对这个例子来说，执行yo name:router就是执行router/index.js
 *
 * Yeoman generator中的generators/app/index.js文件是整个生成器的核心部分，该文件用于告知Yeoman该如何来组织并搭建项目，我们可以在该文件中设置初始化项目时必要的安装提示和选项来让用户选择，以及每个文件应该如何复制和修改，是否需要加载依赖和Node包等内容。
 *
 */
export { default } from './generator.js';
export { default as command } from './command.js';
