import * as THREE from "three"

// Constants:
const sizes = {
    width: window.innerWidth,
    height: 400
}

// Create scene:
const scene = new THREE.Scene();

// Create sphere:
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83"
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

// Light:
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 10, 10);
scene.add(light);


// Camera:
const camera = new THREE.PerspectiveCamera(45, 800 / 600, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// Renderer

export const RenderCanvasById = (id) => {
    try {
        const canvas = document.getElementById("webgl");
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(sizes.width, sizes.height);
        renderer.render(scene, camera);

        // Resize:
        window.addEventListener('resize', () => {
            //sizes.height = window.innerHeight;
            sizes.width = window.innerHeight;
            renderer.setSize(sizes.width, sizes.height);
        })
    } catch (e) {
        console.log("no canvas");
    }
}


