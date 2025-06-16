export class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export const insertNode = (root, value) => {
  if (!root) return new TreeNode(value);
  if (value < root.value) root.left = insertNode(root.left, value);
  else root.right = insertNode(root.right, value);
  return root;
};

export const deleteNode = (root, value) => {
  if (!root) return null;
  if (value < root.value) root.left = deleteNode(root.left, value);
  else if (value > root.value) root.right = deleteNode(root.right, value);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    let minNode = root.right;
    while (minNode.left) minNode = minNode.left;
    root.value = minNode.value;
    root.right = deleteNode(root.right, minNode.value);
  }
  return root;
};

export const searchNode = (root, value) => {
  if (!root) return false;
  if (root.value === value) return true;
  if (value < root.value) return searchNode(root.left, value);
  return searchNode(root.right, value);
};

export const getTraversal = (root, type) => {
  const result = [];
  const inorder = (node) => {
    if (!node) return;
    inorder(node.left);
    result.push(node.value);
    inorder(node.right);
  };
  const preorder = (node) => {
    if (!node) return;
    result.push(node.value);
    preorder(node.left);
    preorder(node.right);
  };
  const postorder = (node) => {
    if (!node) return;
    postorder(node.left);
    postorder(node.right);
    result.push(node.value);
  };

  if (type === "inorder") inorder(root);
  else if (type === "preorder") preorder(root);
  else if (type === "postorder") postorder(root);

  return result;
};
