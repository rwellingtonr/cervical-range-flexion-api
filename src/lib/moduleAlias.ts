import moduleAlias from "module-alias"
import { join } from "node:path"

const alias = {
    "@app": join(__dirname, "..", "app"),
    "@config": join(__dirname, "..", "config"),
    "@database": join(__dirname, "..", "database"),
    "@entities": join(__dirname, "..", "entities"),
    "@helpers": join(__dirname, "..", "helpers"),
    "@middleware": join(__dirname, "..", "middleware"),
    "@modules": join(__dirname, "..", "modules"),
    "@router": join(__dirname, "..", "router"),
    "@repositories": join(__dirname, "..", "repositories"),
    "@utils": join(__dirname, "..", "utils"),
}

moduleAlias.addAliases(alias)
