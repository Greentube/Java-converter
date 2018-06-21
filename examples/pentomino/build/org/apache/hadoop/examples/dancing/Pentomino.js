var org_apache_hadoop_examples_dancing_Pentomino = 
{
    $: function()
    {
        this.width = 0;
        this.height = 0;
        this.pieces = null;
        this.dancer = null;
        this.printer = null;
    }
    ,
    stringifySolution_3: function(width,height,solution)
    {
        var picture = _dim(java_lang_String,2,[height,width,],null);
        var result = (new java_lang_StringBuffer.$())._0();
        for (var row, row_i=solution.iterator_0(); row_i.hasNext_0()&&((row=row_i.next_0())||true);)
        {
            var piece = null;
            for (var item, item_i=row.iterator_0(); item_i.hasNext_0()&&((item=item_i.next_0())||true);)
            {
                if ((item instanceof org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$)) 
                {
                    piece = _checkclass(item,org_apache_hadoop_examples_dancing_Pentomino$24$Piece);
                    break;
                }
            }

            for (var item, item_i=row.iterator_0(); item_i.hasNext_0()&&((item=item_i.next_0())||true);)
            {
                if ((item instanceof org_apache_hadoop_examples_dancing_Pentomino$24$Point.$)) 
                {
                    var p = _checkclass(item,org_apache_hadoop_examples_dancing_Pentomino$24$Point);
                    picture[p.y][p.x] = piece.getName_0();
                }
            }

        }

        for (var y = 0; y < picture.length; y=(y +1)|0) 
        {
            for (var x = 0; x < picture[y].length; x=(x +1)|0) 
            {
                result.append_1(picture[y][x]);
            }
            result.append_1("\n");
        }
        return result.toString_0();
    }
    ,
    oneRotation: null,
    twoRotations: null,
    fourRotations: null,
    isSide_3: function(offset,shapeSize,board)
    {
        return ((((2 * offset)|0) + shapeSize)|0) <= board;
    }
    ,
    generateRows_7: function(dancer,piece,width,height,flip,row,upperLeft)
    {
        var rotations = piece.getRotations_0();
        for (var rotIndex = 0; rotIndex < rotations.length; rotIndex=(rotIndex +1)|0) 
        {
            var shape = piece.getShape_2(flip,rotations[rotIndex]);
            for (var x = 0; x < width; x=(x +1)|0) 
            {
                for (var y = 0; y < height; y=(y +1)|0) 
                {
                    if (((y + shape.length)|0) <= height && ((x + shape[0].length)|0) <= width && ( ! upperLeft || (org_apache_hadoop_examples_dancing_Pentomino.isSide_3(x,shape[0].length,width) && org_apache_hadoop_examples_dancing_Pentomino.isSide_3(y,shape.length,height)))) 
                    {
                        for (var idx = 0; idx < _imul(width, height); idx=(idx +1)|0) 
                        {
                            row[idx] = false;
                        }
                        for (var subY = 0; subY < shape.length; subY=(subY +1)|0) 
                        {
                            for (var subX = 0; subX < shape[0].length; subX=(subX +1)|0) 
                            {
                                row[((((_imul((((y + subY)|0)), width) + x)|0) + subX)|0)] = shape[subY][subX];
                            }
                        }
                        dancer.addRow_1(row);
                    }
                }
            }
        }
    }
    ,
    main_1: function(args)
    {
        var width = 6;
        var height = 10;
        var model = (new org_apache_hadoop_examples_dancing_Pentomino.$())._2(width,height);
        var splits = model.getSplits_1(2);
        for (var splitItr = splits.iterator_0(); splitItr.hasNext_0(); ) 
        {
            var choices = _checkarray(splitItr.next_0(),"I",1);
            java_lang_System.out.print_1("split:");
            for (var i = 0; i < choices.length; i=(i +1)|0) 
            {
                java_lang_System.out.print_1(" "+""+choices[i]);
            }
            java_lang_System.out.println_0();
            java_lang_System.out.println_1(model.solve_1(choices)+""+" solutions found.");
        }
    }
    ,
};
_class(org_apache_hadoop_examples_dancing_Pentomino, java_lang_Object, null,
"org.apache.hadoop.examples.dancing.Pentomino" //replace-me-with-empty-string-for-production//
,{
    getCategory_1: function(names)
    {
        var xPiece = null;
        for (var p, p_i=this.pieces.iterator_0(); p_i.hasNext_0()&&((p=p_i.next_0())||true);)
        {
            if ("x".equals_1(p.name)) 
            {
                xPiece = p;
                break;
            }
        }

        for (var row, row_i=names.iterator_0(); row_i.hasNext_0()&&((row=row_i.next_0())||true);)
        {
            if (row.contains_1(xPiece)) 
            {
                var low__x = this.width;
                var high__x = 0;
                var low__y = this.height;
                var high__y = 0;
                for (var col, col_i=row.iterator_0(); col_i.hasNext_0()&&((col=col_i.next_0())||true);)
                {
                    if ((col instanceof org_apache_hadoop_examples_dancing_Pentomino$24$Point.$)) 
                    {
                        var x = (_checkclass(col,org_apache_hadoop_examples_dancing_Pentomino$24$Point)).x;
                        var y = (_checkclass(col,org_apache_hadoop_examples_dancing_Pentomino$24$Point)).y;
                        if (x < low__x) 
                        {
                            low__x = x;
                        }
                        if (x > high__x) 
                        {
                            high__x = x;
                        }
                        if (y < low__y) 
                        {
                            low__y = y;
                        }
                        if (y > high__y) 
                        {
                            high__y = y;
                        }
                    }
                }

                var mid__x = (((low__x + high__x)|0) === ((this.width - 1)|0));
                var mid__y = (((low__y + high__y)|0) === ((this.height - 1)|0));
                if (mid__x && mid__y) 
                {
                    return org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.CENTER;
                }
                else if (mid__x) 
                {
                    return org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.MID__X;
                }
                else if (mid__y) 
                {
                    return org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.MID__Y;
                }
                break;
            }
        }

        return org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.UPPER__LEFT;
    }
    ,
    initializePieces_0: function()
    {
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("x"," x /xxx/ x ",false,org_apache_hadoop_examples_dancing_Pentomino.oneRotation));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("v","x  /x  /xxx",false,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("t","xxx/ x / x ",false,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("w","  x/ xx/xx ",false,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("u","x x/xxx",false,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("i","xxxxx",false,org_apache_hadoop_examples_dancing_Pentomino.twoRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("f"," xx/xx / x ",true,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("p","xx/xx/x ",true,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("z","xx / x / xx",true,org_apache_hadoop_examples_dancing_Pentomino.twoRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("n","xx  / xxx",true,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("y","  x /xxxx",true,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("l","   x/xxxx",true,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
    }
    ,
    _2: function(width,height)
    {
        this.pieces = (new java_util_ArrayList.$())._0();
        this.dancer = (new org_apache_hadoop_examples_dancing_DancingLinks.$())._0();
        {
            this.initializePieces_0();
        }
        this.initialize_2(width,height);
        return this;
    }
    ,
    _0: function()
    {
        this.pieces = (new java_util_ArrayList.$())._0();
        this.dancer = (new org_apache_hadoop_examples_dancing_DancingLinks.$())._0();
        {
            this.initializePieces_0();
        }
        return this;
    }
    ,
    initialize_2: function(width,height)
    {
        this.width = width;
        this.height = height;
        for (var y = 0; y < height; y=(y +1)|0) 
        {
            for (var x = 0; x < width; x=(x +1)|0) 
            {
                this.dancer.addColumn_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Point.$())._2(x,y));
            }
        }
        var pieceBase = this.dancer.getNumberColumns_0();
        for (var p, p_i=this.pieces.iterator_0(); p_i.hasNext_0()&&((p=p_i.next_0())||true);)
        {
            this.dancer.addColumn_1(p);
        }

        var row = _dim("Z",1,[this.dancer.getNumberColumns_0(),],false);
        for (var idx = 0; idx < this.pieces.size_0(); idx=(idx +1)|0) 
        {
            var piece = _checkclass(this.pieces.get_1(idx),org_apache_hadoop_examples_dancing_Pentomino$24$Piece);
            row[((idx + pieceBase)|0)] = true;
            org_apache_hadoop_examples_dancing_Pentomino.generateRows_7(this.dancer,piece,width,height,false,row,idx === 0);
            if (piece.getFlippable_0()) 
            {
                org_apache_hadoop_examples_dancing_Pentomino.generateRows_7(this.dancer,piece,width,height,true,row,idx === 0);
            }
            row[((idx + pieceBase)|0)] = false;
        }
        this.printer = (new org_apache_hadoop_examples_dancing_Pentomino$24$SolutionPrinter.$())._2(width,height);
    }
    ,
    getSplits_1: function(depth)
    {
        return this.dancer.split_1(depth);
    }
    ,
    solve_1: function(split)
    {
        return this.dancer.solve_2(split,this.printer);
    }
    ,
    solve_0: function()
    {
        return this.dancer.solve_1(this.printer);
    }
    ,
    setPrinter_1: function(printer)
    {
        this.printer = printer;
    }
    ,
});
org_apache_hadoop_examples_dancing_Pentomino.oneRotation = _arr("I",1,[0]);
org_apache_hadoop_examples_dancing_Pentomino.twoRotations = _arr("I",1,[0,1]);
org_apache_hadoop_examples_dancing_Pentomino.fourRotations = _arr("I",1,[0,1,2,3]);
//reference// org/apache/hadoop/examples/dancing/Pentomino$SolutionCategory
//reference// org/apache/hadoop/examples/dancing/Pentomino$Piece
//reference// org/apache/hadoop/examples/dancing/Pentomino$SolutionPrinter
//reference// org/apache/hadoop/examples/dancing/Pentomino
//reference// java/lang/StringBuffer
//reference// org/apache/hadoop/examples/dancing/Pentomino$Point
//reference// java/lang/System
//load// java/lang/Object
//complete// org/apache/hadoop/examples/dancing/DancingLinks
//complete// java/util/ArrayList
