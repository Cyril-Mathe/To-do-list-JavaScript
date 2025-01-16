// Gestion de la vue visible
function afficherVue(nomVue) {
    // Retire la classe visible à la vue visible
    document.querySelector('.vue.visible').classList.remove('visible');
    // Ajoute la classe visible à la vue
    document.querySelector(`#${nomVue}`).classList.add('visible');
  }


  // Variable global pour la liste des todos
  const todos = [];


  // Creation d'un todo
  function creerTodo(titre, description) {
    todos.push({
      id: crypto.randomUUID(), // identifiant unique
      // titre: titre,
      // description: description,
      titre,
      description,
      etat: 'À faire',
    });
  }


  // Lister todos
  function listerTodosEnHTML() {
    return todos.map((todo) => {
      const article = document.createElement('article');
      const p = document.createElement('p');
      const button = document.createElement('button');
      article.append(p, button);
      p.textContent = `[${todo.etat}] ${todo.titre}`;
      button.textContent = 'Voir plus';
      button.onclick = () => {
        // Remplir la vue modifier
        injecterTodoDansDetails(todo);
        // Afficher la vue modifier
        afficherVue('details');
      };
      return article;
    });
  }


  // Injecter les todos dans la vue liste
  function injecterTodoDansVueListe() {
    // Retrouve la liste
    const vue = document.querySelector('#liste');
    // Vide la liste
    vue.innerHTML = "";
    // Injecte le contenu
    const elements = listerTodosEnHTML();
    // elements.forEach((el) => { vue.append(el); });
    // elements.forEach(vue.append);
    // vue.append(elements); // ne marche pas car append attend des paramètres, pas un tableau d'éléments
    vue.append(...elements);
  }


  // Barre de navigation
  document.querySelectorAll('button.changervue').forEach((btn) => {
    btn.addEventListener('click', () => {
      // .dataset.vueAAfficher -> data-vue-a-afficher
      afficherVue(btn.dataset.vueAAfficher);
    })
  })
  // document.querySelector('#changerVueListe').addEventListener('click', () => {
  //   afficherVue('liste');
  // });
  // document.querySelector('#changerVueCreation').addEventListener('click', () => {
  //   afficherVue('creation');
  // });


  // Gestion du formulaire d'ajout
  document.querySelector('#creation > form').addEventListener('submit', (e) => {
    // Empêche le comportement par défaut
    e.preventDefault();
    // Récupère les informations du formulaire
    const titre = e.target.titre.value;
    const description = e.target.description.value;
    // Vide le formulaire
    e.target.reset();
    // Ajoute le todo à la liste
    creerTodo(titre, description);
    // Mettre à jour l'interface liste des todos
    injecterTodoDansVueListe();
    // Affiche la vue liste
    afficherVue('liste');
  });


  // Remplir details
  function injecterTodoDansDetails(todo) {
    // Remplit les champs
    document.querySelector('#id_d').value = todo.id;
    document.querySelector('#etat_d').value = todo.etat;
    document.querySelector('#titre_d').value = todo.titre;
    document.querySelector('#description_d').value = todo.description;
  }


  // Gestion du submit de modification de todo
  document.querySelector('#details > form').addEventListener('submit', (e) => {
    // Annule le comportement par défaut
    e.preventDefault();
    // Récupère les valeurs
    const id = e.target.id.value;
    const etat = e.target.etat.value;
    const titre = e.target.titre.value;
    const description = e.target.description.value;
    // Retrouve le todo dans la liste
    // Find est l'équivalent de filter mais en ne gardant que le premier résultat
    // const todo = todos.find((t) => (t.id === id));
    // { id: tid } -> on ne récupère que le paramètre id du todo, que l'on renomme tid vu que le nom id est déjà pris à la ligne 168. Ensuite on compare tid (id du todo en cours) avec id (id dans le formulaire)
    const todo = todos.find(({ id: tid }) => (tid === id));
    // Modifier le todo dans la liste
    todo.etat = etat;
    todo.titre = titre;
    todo.description = description;
    // Mettre à jour la liste de todo
    injecterTodoDansVueListe();
  });


  // Supprimer un todo
  function supprimerTodo(id) {
    // Retrouve la position du todo dans la liste
    // pos = 0;
    // for (todo in todos) {
      //   if (todo.id === id) {
        //     break
        //   }
        //   pos++
        // }
        // pos = position de l'élément
    const position = todos.findIndex((t) => (t.id === id));
    // Retire l'élément de la liste
    todos.splice(position, 1);
  }


  document.querySelector('#supprimerTodo').addEventListener('click', () => {
    // Confirme la suppression (return si non confirmé, donc sortie immédiate de la fonction)
    if (!confirm('Confirmer la suppression du todo ?')) return;
    // Récupère l'id de l'élément à supprimer dans le formulaire de modification
    const id = document.querySelector('#id_d').value;
    // Retirer l'élément de la liste des todos
    supprimerTodo(id);
    // Mettre à jour l'interface de liste
    injecterTodoDansVueListe();
    // Redirige vers la vue liste
    afficherVue('liste');
  });
