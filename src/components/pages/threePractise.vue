<template>
  <div>
    <head-top></head-top>
    <div id="container" class="container">
    </div>
  </div>
</template>

<script>
  import headTop from './headTop';
  import * as THREE from 'three';
  import {MTLLoader,OBJLoader} from 'three-obj-mtl-loader';
  import {CSS2DRenderer, CSS2DObject} from 'three-css2drender';
  const OrbitControls = require('three-orbit-controls')(THREE);

  export default {
    name: "threePractise",
    data() {
      return {
        scene: '',
        camera: '',
        light: '',
        controls: '',
        renderer: '',
        geometry: '',
        material: '',
        cube: ''
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.init();
      this.render();
    },
    methods: {
      init(){
        // 创建场景
        this.scene = new THREE.Scene();
        this.light = new THREE.DirectionalLight(0xdfebff, 0.45);//从正上方（不是位置）照射过来的平行光，0.45的强度
        this.light.position.set(50, 200, 100);
        this.light.position.multiplyScalar(0.3);
        this.scene.add(this.light);
        // 创建透视相机
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.camera.position.set(10, 90, 65);
        this.camera.lookAt(this.scene.position);
        //初始化控制器
        this.controls = new OrbitControls(this.camera);
        this.controls.target.set(0, 0, 0);
        this.controls.minDistance = 80;
        this.controls.maxDistance = 400;
        this.controls.maxPolarAngle = Math.PI / 3;
        this.controls.update();

        this.geometry = new THREE.BoxGeometry(100,100,100);
        this.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.cube = new THREE.Mesh(this.geometry,this.material);
        this.cube.rotation.x += 0.1;
        this.cube.rotation.y += 0.1;
        this.scene.add(this.cube);
        // 创建一个 WebGL 渲染器
        this.renderer = new THREE.WebGLRenderer({
          alpha: true,// 默认情况下为黑色场景，此处设置为透明（即白色场景）
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);//为了兼容高清屏幕
        this.renderer.setSize(700, 700);
        const container = document.getElementById('container');
        container.appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onWindowResize, false);//添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
      },
      onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(500, 500);
      },
      render() {
        requestAnimationFrame(this.render); // 让浏览器执行参数中的函数，不断循环（浏览器一个新的API）
        this.renderer.render(this.scene, this.camera); // 结合场景和相机进行渲染，即用摄像机拍下此刻的场景
      }
    }
  }
</script>

<style>
  .container{
    position: absolute;
    left: 16.6667%;
    top: 16.6667%;
  }
</style>

