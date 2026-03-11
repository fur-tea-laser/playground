
await renderAnimation({
  processCount: 6,
  scriptPath: Deno.args[0],
  framesDirectoryPath: Deno.args[1],
  animationName: Deno.args[2],
  framePixelResolution: parseInt(Deno.args[3]),
  fieldOfViewAngle: parseFloat(Deno.args[4]),
  frameCount: parseInt(Deno.args[5])
})

interface RenderAnimationApi {
  scriptPath: string
  framesDirectoryPath: string
  animationName: string 
  framePixelResolution: number
  frameCount: number
  fieldOfViewAngle: number
  processCount: number
}

async function renderAnimation({
  processCount,
  frameCount,
  scriptPath,
  framesDirectoryPath,
  animationName,
  framePixelResolution,
  fieldOfViewAngle
}: RenderAnimationApi) {
  const frameIndexQueue = 
    new Array(frameCount)
      .fill(undefined)
      .map((_, someFrameIndex) => someFrameIndex)
  await Promise.all(
    new Array(processCount)
    .fill(undefined)
    .map(() => renderFrame({
      scriptPath,
      framesDirectoryPath,
      animationName,
      framePixelResolution,
      fieldOfViewAngle,
      frameCount,
      frameIndexQueue,
      frameIndex: frameIndexQueue.shift()!,
    }))
  )
}

interface RenderFrameApi {
  scriptPath: string
  framesDirectoryPath: string
  animationName: string
  fieldOfViewAngle: number
  framePixelResolution: number
  frameCount: number
  frameIndex: number,
  frameIndexQueue: Array<number>
}

async function renderFrame({
  scriptPath, 
  framesDirectoryPath, 
  animationName,
  framePixelResolution,
  fieldOfViewAngle,
  frameCount,
  frameIndex,
  frameIndexQueue
}: RenderFrameApi) {
  const renderFrameCommand = new Deno.Command(
    "./binaries/renderFrame_3d", {
    args: [
      scriptPath,
      framesDirectoryPath,
      animationName,
      `${framePixelResolution}`,
      `${fieldOfViewAngle}`,
      `${frameCount}`,
      `${frameIndex}`
      ],
  });
  await renderFrameCommand.output();
  const maybeNextFrameIndex = frameIndexQueue.shift()
  if (maybeNextFrameIndex !== undefined) {
    return renderFrame({
      scriptPath, 
      framesDirectoryPath, 
      animationName,
      framePixelResolution,
      fieldOfViewAngle,
      frameCount,
      frameIndexQueue,
      frameIndex: maybeNextFrameIndex
    })
  }
}
