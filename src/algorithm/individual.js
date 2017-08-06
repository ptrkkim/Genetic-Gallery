function Individual (dna) {
  this.dna = dna ? dna.slice() || [];
}

Individual.prototype.mutate = function (probMutate) {
  for (let index = 0; index < this.dna.length; index++) {
    
  }
}