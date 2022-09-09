<template>
  <div>
	<h1>About Pong</h1>
    <div class="about">
    <p class="what-is-pong">Pong (stilizzato PONG) è uno dei primi videogiochi commercializzati, prodotto dalla Atari come arcade nel 1972 e come console dedicata nel 1975. Ė un simulatore di ping-pong (da cui il nome "PONG"), dalla grafica estremamente semplificata in bianco e nero.


      Indice
      1	Modalità di gioco
      2	Storia
      3	Tecnologia
      4	Note
      5	Bibliografia
      6	Voci correlate
      7	Altri progetti
      8	Collegamenti esterni
      Modalità di gioco
      Pong è un videogioco sportivo bidimensionale che simula in modo molto semplificato il tennistavolo. Il giocatore controlla una racchetta sotto la forma di una barra bianca che può muovere verticalmente lungo un lato dello schermo.[1] È possibile giocare in singolo contro il computer o a due giocatori. L'obiettivo del giocatore è colpire una palla, simulata da un piccolo quadrato, e rispedirla all'altra racchetta: il giocatore che non riesce a rispedire la palla concede un punto al suo avversario.[2] La palla si muove con moto rettilineo uniforme e può rimbalzare sui lati superiore e inferiore dello schermo.
		<br><br>
      Storia
	<br><br>


      La cabina
      Le prime immagini di un videogioco di ping-pong appartengono al 1966, anno nel quale un giovane ingegnere della Sanders Associates inizia a lavorare su "un progetto per un utilizzo alternativo degli apparecchi televisivi". Il progetto incontra però grosse difficoltà e la sua conclusione finirà per slittare al 1971; la Magnavox commercializza quindi il gioco prodotto dalla Sanders con il nome di Odyssey. Questo è da considerarsi l'antenato di "PONG" e la prima console della storia.
	<br><br>

      Poi Nolan Bushnell, allora fresco di laurea, che diventerà in seguito il fondatore della Atari, ispirandosi all'Odyssey fece sviluppare ad Allan Alcorn il gioco Pong per Atari. Sotto la sua direzione nascerà nel 1972 uno dei primi videogiochi coin-op (attivati a monete) della storia (il primo in assoluto fu Computer Space del 1971, ideato dallo stesso Nolan, e che però ebbe meno successo), ovvero PONG, che ricalcava molto da vicino il gioco della Sanders con alcune differenze di gameplay come la possibilità di dare effetti al tiro colpendo la pallina all'ultimo momento.
	<br><br>

      La versione domestica, costituita da una console da collegare al televisore, fu lanciata sul mercato dalla Atari il 3 agosto 1975. Successivamente nel 1978 la General Instruments lanciò una serie di circuiti integrati VLSI dedicati a questo genere di videogiochi, il più famoso dei quali è stato il modello AY-3-8500, che permise di abbassare notevolmente il costo di produzione del videogioco e di aumentarne di conseguenza la produzione di massa e diffusione casalinga.
	<br><br>

      Tecnologia
	<br><br>

      La tecnica di generazione dell'immagine sul televisore non era ancora basata sul concetto di matrice di pixel, ma si procedeva per manipolazione della linea di scansione del cinescopio con componenti elettronici di tipo analogico. I contatti tra la palla e racchetta e tra palla e bordi del campo venivano realizzati con componenti logici (porta logica) tipici dell'elettronica digitale (porte AND, OR, NAND, NOR e multivibratori). Inoltre la quasi totalità di questo genere di giochi era in bianco e nero, o al più con qualche tono di grigio, in considerazione che la maggior parte dei televisori di quel periodo era in bianco e nero.</p>
    <img width="400" height="650" id="pong-img" alt="pingpong" src="../assets/pong.jpg">

    </div>
    <p id="about-line">Created by Nick Kuipers, Jasper Simonis, Turlough Mullan, and Jesse van der Wolf in 2022 as the final project for Codam Common Core.
    </p>
  </div>
</template>

<style scoped>
.what-is-pong {
  float: left;
  text-align: left;
  width: 70%;
  margin: 30px;
}

.about {
	margin-left: 250px;
	float: center;
	display: flex;
	flex-direction: row;
	max-width:70%;
}

#pong-img {
	margin-top: 50px;
	width: 400px;
}

#about-line {
  float: center;
}
</style>