var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = -40;
camera.position.y = 50;
camera.position.z = 70;
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);

var planeGeometry = new THREE.PlaneGeometry(60, 40);
var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
});

var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveSahdow = true;
scene.add(plane);

var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
scene.add(spotLight);


var axis = new THREE.AxisHelper(100);
scene.add(axis);

document.body.appendChild(renderer.domElement);

var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = 0;
stats.domElement.style.top = 0;
document.body.appendChild(stats.domElement);

var Control = function() {
    this.rotationSpeed = 0.01;
    this.objectCnt = scene.children.length;
    this.addCube = function() {
        var cubeSize = Math.random() * (10 - 5) + 5;
        var tempCubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        var tempCubeMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff * Math.random()
        });
        var tempCube = new THREE.Mesh(tempCubeGeometry, tempCubeMaterial);
        tempCube.name = 'cube-' + scene.children.length;
        tempCube.position.x = Math.random() * (30 - (-30)) + (-30);
        tempCube.position.y = Math.random() * (5 - 2) + 2;;
        tempCube.position.z = Math.random() * (20 - (-20)) + (-20);
        scene.add(tempCube);
        this.objectCnt = scene.children.length;
    };
    this.removeLastCube = function() {
        var allChildren = scene.children;
        var lastChild = allChildren[allChildren.length - 1];
        if (lastChild instanceof THREE.Mesh && lastChild != plane) {
            scene.remove(lastChild);
            this.objectCnt = scene.children.length;
        }
    };
    this.logObj = function() {
        console.log(scene.children);
    };

}

var control = new Control();
var gui = new dat.GUI();
gui.add(control, 'rotationSpeed', 0, 0.1);
gui.add(control, 'objectCnt');
gui.add(control, 'addCube');
gui.add(control, 'removeLastCube');
gui.add(control, 'logObj');

refresh();

function refresh() {

    stats.update();
    scene.traverse(function(e) {
        if (e instanceof THREE.Mesh && e != plane) {
            e.rotation.x += control.rotationSpeed;
            e.rotation.y += control.rotationSpeed;
        }
    })
    renderer.render(scene, camera);
    requestAnimationFrame(refresh);
}