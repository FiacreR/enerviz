// Initialise
function initialise() {
    var canvas = createCanvas(500, 280);
    canvas.parent('canvasForHTML');
    // Initialise colors
    fill(255,255,255);
    rect(-2, -2, width+2, height+2);
    photonColor = color(255, 255, 255);
    electronColor = color(216, 31, 42);
    let electronCloudColor = color(216, 31, 42);
    electronCloudColor.setAlpha(10); 
    holeColor = color(0, 126, 163);
    absorberColor = color(163, 163, 163);
    electronMembraneColor = color(231, 104, 209);
    holeMembraneColor = color(110, 121, 224);
    metalColor = color(98, 101, 112);
    leftSide = width/8;
    rightSide = width-width/8-10;
    topSide = height/4;
    bottomSide = topSide+100;
    middle = (topSide + bottomSide)/2;
    middlex = (leftSide + rightSide)/2;
    electronMembrane = 0;
    holeMembrane = 0;
    metal = 0;
    spring = 0.05;
    k=0;
    rotationAngle = 0;
    rotationSpeed = 0;
}

function electronHoleInteraction(interactionStrength,interactionLength,recombinationProbabilityFraction) {
// Electron Hole interaction
  for (let j = electrons.length-1; j >= 0; j--) {
    for (let i = holes.length-1; i >= 0; i--) {
        if (random(1)>0) {

          let dx = holes[i].x - electrons[j].x;
          let dy = holes[i].y - electrons[j].y;
          let distance = sqrt(dx * dx + dy * dy);
          let minDist = interactionLength*(holes[i].diameter + electrons[j].diameter);
          //console.log(distance);
          //console.log(minDist);
          if ((distance < minDist)&&(electrons[i].y<bottomSide-4)) {
            let angle = atan2(dy, dx);
            let targetX = electrons[j].x + cos(angle) * minDist;
            let targetY = electrons[j].y + sin(angle) * minDist;
            let ax = (targetX - holes[i].x) * interactionStrength;
            let ay = (targetY - holes[i].y) * interactionStrength;
            electrons[j].vx += ax;
            electrons[j].vy += ay;
            holes[i].vx -= ax;
            holes[i].vy -= ay;
            electrons[j].x += electrons[i].vx;
            electrons[j].y += electrons[i].vy;
            holes[i].x += holes[i].vx;
            holes[i].y += holes[i].vy;
          }
          if ((distance < minDist)&&((random(1)>(1-recombinationProbabilityFraction))||(electrons[i].y>bottomSide+10))) {
              if ((electrons[i].y<bottomSide)) {
                  let pvx = random(-2,2);
                  let pvy = sqrt(2-pvx*pvx);
                  if (random(1)>0.5) {
                      pvy = -pvy;
                  }
                  let photon = new Photon((holes[i].x+electrons[i].x)/2, (holes[i].y+electrons[i].y)/2,pvx,pvy, photons);
                  photons.push(photon);
              }
              holes.splice(i,1);
              electrons.splice(j,1);
              i=0;
              j=0;

            }
        }
    }
  }
}

// Cell elements
function displayCellElements(dipsplayAbsorber,dipsplayElectronMembrane,dipsplayHoleMembrane,dipsplayMetal) {
    stroke(255,0);
    fill(20,20,20);
    rect(-20, -20, width+20, height+20);
    
    if (dipsplayAbsorber==1) {
      stroke(absorberColor);
      fill(absorberColor);
      rect(leftSide-5, topSide-5, rightSide-leftSide+10, bottomSide-topSide+10);
  }
  
      if (dipsplayElectronMembrane==1) {
      stroke(electronMembraneColor);
      fill(electronMembraneColor);
      rect(leftSide-5, topSide-5, rightSide-leftSide+10, 14);
  }
  
      if (dipsplayHoleMembrane==1) {
      stroke(holeMembraneColor);
      fill(holeMembraneColor);
      rect(leftSide-5, bottomSide-8, rightSide-leftSide+10, 14);
  }
  
      if (dipsplayMetal==1) {
      stroke(metalColor);
      fill(metalColor);
      rect(rightSide-35, topSide-26, 40, 20);
      rect(rightSide, topSide-11, 40, 5);
      rect(rightSide+40, topSide-11, 5, bottomSide - topSide + 23);
      rect(rightSide, bottomSide+7, 40, 5);
      rect(rightSide-35, bottomSide+7, 40, 20);
  }
}

// Legend
function displayLegend(dipsplayPhoton,dipsplayElectron,dipsplayHole,dipsplayAbsorber,dipsplayElectronMembrane,dipsplayHoleMembrane,dipsplayMetal) {
  let offset = width/2-80;

  if (dipsplayPhoton==1) {
      stroke(255);
      fill(photonColor);
      ellipse(offset+10, height-40, 10, 10);
      fill(255);
      stroke(0);
      text('Photon',offset+ 20, height-36);
  }
  
    if (dipsplayElectron==1) {
      stroke(255);
      fill(electronColor);
      ellipse(offset+10, height-25, 10, 10);
      fill(255);
      stroke(0);
      text('Electron', offset+20, height-21);
  }
  
    if (dipsplayHole==1) {
      stroke(255);
      fill(holeColor);
      ellipse(offset+10, height-10, 10, 10);
      fill(255);
      stroke(0);
      text('Hole', offset+20, height-6);
  }
  
    if (dipsplayAbsorber==1) {
      stroke(absorberColor);
      fill(absorberColor);
      rect(offset+80, height-60, 10, 10);
      fill(255);
      stroke(0);
      text('Absorber', offset+100, height-49);
  }
  
      if (dipsplayElectronMembrane==1) {
      stroke(electronMembraneColor);
      fill(electronMembraneColor);
      rect(offset+80, height-45, 10, 10);
      fill(255);
      stroke(0);
      text('Electron Membrane', offset+100, height-36);
  }
  
      if (dipsplayHoleMembrane==1) {
      stroke(holeMembraneColor);
      fill(holeMembraneColor);
      rect(offset+80, height-30, 10, 10);
      fill(255);
      stroke(0);
      text('Hole Membrane', offset+100, height-21);
  }
  
      if (dipsplayMetal==1) {
      stroke(metalColor);
      fill(metalColor);
      rect(offset+80, height-15, 10, 10);
      fill(255);
      stroke(0);
      text('Metal Contact', offset+100, height-6);
      fill(211, 211, 211);
      stroke(211, 211, 211);
      push();
      translate(offset+220,height-25);
      beginShape();
          vertex(-2.5, 2.5);
          vertex(0, 12.5);
          vertex(2.5, 2.55);
          vertex(12.5, 0);
          vertex(2.5, -2);
          vertex(0, -12.5);
          vertex(-2.5, -2);
          vertex(-12.5, 0);
      endShape();
      pop();
      fill(255);
      stroke(0);
      text('Load', offset+240, height-20);
  }
}