var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 500;

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);

var cubeGeometry = new THREE.BoxGeometry(50, 50, 50);
var cubeMaterial = new THREE.MeshNormalMaterial({
    // color: 0xff0000,
    wireframe: false
});

var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cube);

document.body.appendChild(renderer.domElement);


var stats = new Stats();
stats.domElement.style.position = "absolute";
stats.domElement.style.top = 0;
stats.domElement.style.left = 0;
document.body.appendChild(stats.domElement);


var Controls = function() {
    this.rotationSpeed = 0.01;
}

var control = new Controls();
var gui = new dat.GUI();
gui.add(control, 'rotationSpeed', 0, 0.1);

update();

function update() {
    stats.update();
    requestAnimationFrame(update);
    cube.rotation.x += control.rotationSpeed;
    cube.rotation.y += control.rotationSpeed;
    renderer.render(scene, camera);
}