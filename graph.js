class Graph {
  #adjMatrix = {};
  constructor(directed = false) {
    this.directed = directed;
  }

  addNode(nodeName) {
    if (this.#adjMatrix.hasOwnProperty(nodeName)) {
      throw new Error("This node exists");
    } else {
      this.#adjMatrix[nodeName] = [];
    }
  }

  addEdge(nod1, nod2) {
    if (!this.#adjMatrix.hasOwnProperty(nod1) || !this.#adjMatrix.hasOwnProperty(nod2)) {
      throw new Error("One of the nodes does not exist");
    } else {
      this.#adjMatrix[nod1].push(nod2);
      if (this.directed === true) {
        this.#adjMatrix[nod2].push(nod1);
      }
    }
  }

  showGraph() {
    console.log(this.#adjMatrix);
  }

  #dfs(node, visited) {
    visited[node] = true;
    for (const neighbor of this.#adjMatrix[node]) {
      if (!visited[neighbor]) {
        this.#dfs(neighbor, visited);
      }
    }
  }

  isConnected() {
    const nodes = Object.keys(this.#adjMatrix);
    if (nodes.length === 0) {
      return true;
    }

    const visited = {};
    for (const node of nodes) {
      visited[node] = false;
    }

    this.#dfs(nodes[0], visited);

    for (const node of nodes) {
      if (!visited[node]) {
        return false;
      }
    }

    return true;
  }

  findShortestPath(startNode, endNode) {
    if (!this.#adjMatrix.hasOwnProperty(startNode) || !this.#adjMatrix.hasOwnProperty(endNode)) {
      throw new Error("One of the nodes does not exist");
    }

    const queue = [startNode];
    const visited = { [startNode]: null };

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (currentNode === endNode) {
        const path = [];
        let node = endNode;

        while (node !== null) {
          path.unshift(node);
          node = visited[node];
        }

        return path;
      }

      for (const neighbor of this.#adjMatrix[currentNode]) {
        if (!visited.hasOwnProperty(neighbor)) {
          queue.push(neighbor);
          visited[neighbor] = currentNode;
        }
      }
    }

    return null;
  }
}
