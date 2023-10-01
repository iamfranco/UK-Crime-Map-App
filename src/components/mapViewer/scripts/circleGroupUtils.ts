const onionLayer2LeadDotIndex = (n: number) => 3 * n * (n-1) + 1
const dotIndex2OnionLayerNumber = (x: number) => Math.floor((3 + Math.sqrt(12 * x - 3)) / 6);
const dotIndex2DotPosition = (x: number, dotRadius: number): [number, number] => {
  let position: [number, number] = [0, 0];
  if (x == 0) {
    return position;
  }
  
  const layerNumber = dotIndex2OnionLayerNumber(x);
  const layerLeadDotIndex = onionLayer2LeadDotIndex(layerNumber);
  
  position[0] += layerNumber * dotRadius * 2;
  
  if (layerLeadDotIndex == x) {
    return position;
  }
  
  const xScale = dotRadius;
  const yScale = Math.sqrt(3) * dotRadius;
  const offsetDirectionX = [-1, -2, -1, 1, 2, 1];
  const offsetDirectionY = [-1, 0, 1, 1, 0, -1];
  
  let offsetDirectionIndex = 0;
  for (let i=1; i<=x-layerLeadDotIndex; i++) {
    position[0] += offsetDirectionX[offsetDirectionIndex] * xScale;
    position[1] += offsetDirectionY[offsetDirectionIndex] * yScale;
    if ((i-1) % layerNumber == layerNumber-1) {
      offsetDirectionIndex++ 
    }
  }
  
  return position;
}

export class CircleGroupUtils {
  dotIndex2DotPosition = dotIndex2DotPosition
}