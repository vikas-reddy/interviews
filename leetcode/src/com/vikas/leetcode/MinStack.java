package com.vikas.leetcode;

import java.util.Stack;

class MinStack {
   private class Node {
      public Integer element;
      public Integer minElement;

      public Node(Integer element, Integer minElement) {
         this.element = element;
         this.minElement = minElement;
      }
   }

   private Stack<Node> stack;

   /** initialize your data structure here. */
   public MinStack() {
      stack = new Stack<>();
   }

   public void push(int x) {
      Integer minElement = x;
      if (!stack.isEmpty()) {
         Node topNode = stack.peek();
         if (topNode.minElement < minElement) {
            minElement = topNode.minElement;
         }
      }
      stack.add(new Node(x, minElement));
   }

   public void pop() {
      if (stack.isEmpty()) {
         return;
      }
      stack.pop();
   }

   public int top() {
      return stack.peek().element;
   }

   public int getMin() {
      return stack.peek().minElement;
   }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack obj = new MinStack();
 * obj.push(x);
 * obj.pop();
 * int param_3 = obj.top();
 * int param_4 = obj.getMin();
 */