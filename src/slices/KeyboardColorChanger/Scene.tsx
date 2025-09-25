import { Keyboard } from "@/components/Keyboard";
import { Stage, useTexture } from "@react-three/drei";
import { KEYCAP_TEXTURES } from ".";
import { useMemo } from "react";
import * as Three from "three";

type SceneProps = {
  selectedTextureId: string;
  onAnimationComplete: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Scene({ selectedTextureId, onAnimationComplete }: SceneProps) {
  const texturePaths = KEYCAP_TEXTURES.map((texture) => texture.path);
  const textures = useTexture(texturePaths);

  const materials = useMemo(() => {
    const materialsMap: { [key: string]: Three.MeshStandardMaterial } = {};

    KEYCAP_TEXTURES.forEach((textureConfig, index) => {
      const texture = Array.isArray(textures) ? textures[index] : textures;

      if (texture) {
        texture.flipY = false;
        texture.colorSpace = Three.SRGBColorSpace;

        materialsMap[textureConfig.id] = new Three.MeshStandardMaterial({
          map: texture,
          roughness: 0.7,
        });
      }
    });

    return materialsMap;
  }, [textures]);

  const currentKnobColor = KEYCAP_TEXTURES.find(
    (texture) => texture.id === selectedTextureId
  )?.knobColor;

  return (
    <Stage environment={"city"} intensity={0.05} shadows="contact">
      <group>
        <Keyboard
          keycapMaterial={materials[selectedTextureId]}
          knobColor={currentKnobColor}
        />
      </group>
    </Stage>
  );
}
