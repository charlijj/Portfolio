#lang racket


(define (fibonacci n)
  (define (fibCall n fibSeq)
    
    ;get currant length of sequence
    (define len (length fibSeq))
    
    ;When n is not greater than 0, jump to base case
    (if (> n 0)

      (if (> len 1)
      
        ;If the list is not empty
        (fibCall (- n 1) (append fibSeq (list (+ (list-ref fibSeq (- len 1)) (list-ref fibSeq (- len 2))))))
        
        ;If the list is empty, the first element with always be 1.
        (fibCall (- n 1) (append fibSeq '(1)))
      )
      (reverse fibSeq) ;Base case
    )
  )
  (fibCall n '(0))
)

(fibonacci 0) ; -> ’(0)
(fibonacci 1) ; -> ’(1 0)
(fibonacci 2) ; -> ’(1 1 0)
(fibonacci 3) ; -> ’(2 1 1 0)
(fibonacci 4) ; -> ’(3 2 1 1 0)
(fibonacci 5) ; -> ’(5 3 2 1 1 0)
(fibonacci 13) ; -> ’(233 144 89 55 34 21 13 8 5 3 2 1 1 0)