import { existsSync, readFileSync, writeFileSync } from "fs";

for (const dir of ["BP", "RP"]) {
    const path = `${dir}/manifest.json`;
    if (!existsSync(path)) continue;
    const manifest = JSON.parse(readFileSync(path).toString());
    for (const module of manifest.modules) {
        delete module.description;
        if (module.version[0] === 0 && module.version[1] === 0 && module.version[2] === 1) module.version = manifest.header.version;
    }
    writeFileSync(path, JSON.stringify(manifest, undefined, 2));
}
