
await renderAnimation({
  processCount: 8,
  scriptPath: Deno.args[0],
  outputDirectoryPath: Deno.args[1],
  animationName: Deno.args[2],
  framePixelResolution: parseInt(Deno.args[3]),
  fieldOfViewAngle: parseFloat(Deno.args[4]),
  frameCount: parseInt(Deno.args[5])
})

interface RenderAnimationApi {
  scriptPath: string
  outputDirectoryPath: string
  animationName: string 
  framePixelResolution: number
  frameCount: number
  fieldOfViewAngle: number
  processCount: number
}

async function renderAnimation({
  outputDirectoryPath,
  processCount,
  frameCount,
  scriptPath,
  animationName,
  framePixelResolution,
  fieldOfViewAngle
}: RenderAnimationApi) {
  const framesDirectoryPath = `${outputDirectoryPath}frames/`
  try {
    await Deno.remove(outputDirectoryPath, { recursive: true });
  }
  catch {}
  await Deno.mkdir(framesDirectoryPath, { recursive: true });
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
  await encodeAnimation({
    outputDirectoryPath,
    framesDirectoryPath,
    animationName
  })
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
  console.log(`rendering frame: ${frameIndex}/${frameCount}`)
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

interface EncodeAnimationApi {
  outputDirectoryPath: string
  framesDirectoryPath: string
  animationName: string
}

async function encodeAnimation({
  outputDirectoryPath,
  framesDirectoryPath,
  animationName
}: EncodeAnimationApi) {
  const encodeAnimationCommand = new Deno.Command(
    "./binaries/encodeAnimation", {
    args: [
      outputDirectoryPath,
      framesDirectoryPath,
      animationName
    ]
  });
console.log("encoding animation")
await encodeAnimationCommand.output();
}