export class ChunkIncludes {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap('ChunkIncludes', compilation => {
            compilation.hooks.afterOptimizeChunkAssets.tap(
                'ChunkIncludes',
                chunks => {
                    chunks.forEach(chunk => {
                        console.log({
                            id: chunk.id,
                            name: chunk.name,
                            includes: Array.from(
                                chunk.modulesIterable,
                                getModuleRequest,
                            ),
                        });
                    });
                },
            );
        });
    }
}

function getModuleRequest(module) {
    return {
        id: module.id,
        request: module.request,
    };
}
