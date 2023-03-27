from flask import Flask, render_template
app = Flask(__name__)

page_titles = {
    'page1': 'Page 1 Title',
    'page2': 'Page 2 Title',
    'page3': 'Page 3 Title',
    'page4': 'Page 4 Title',
    'page5': 'Page 5 Title',
    'page6': 'Page 6 Title',
    'page7': 'Page 7 Title',
    'page8': 'Page 8 Title',
    'page9': 'Page 9 Title',
    'page10': 'Page 10 Title',
    'page11': 'Page 11 Title',
    'page12': 'Page 12 Title',
}


@app.route('/')
def page1():
    return render_template('page1.html', page_titles=page_titles, page_title=page_titles['page1'])

@app.route('/page2/')
def page2():
    return render_template('page2.html', page_titles=page_titles, page_title=page_titles['page2'])

@app.route('/page3/')
def page3():
    return render_template('page3.html', page_titles=page_titles, page_title=page_titles['page3'])

@app.route('/page4/')
def page4():
    return render_template('page4.html', page_titles=page_titles, page_title=page_titles['page4'])

@app.route('/page5/')
def page5():
    return render_template('page5.html', page_titles=page_titles, page_title=page_titles['page5'])

@app.route('/page6/')
def page6():
    return render_template('page6.html', page_titles=page_titles, page_title=page_titles['page6'])

@app.route('/page7/')
def page7():
    return render_template('page7.html', page_titles=page_titles, page_title=page_titles['page7'])

@app.route('/page8/')
def page8():
    return render_template('page8.html', page_titles=page_titles, page_title=page_titles['page8'])

@app.route('/page9/')
def page9():
    return render_template('page9.html', page_titles=page_titles, page_title=page_titles['page9'])


@app.route('/page10/')
def page10():
    return render_template('page10.html', page_titles=page_titles, page_title=page_titles['page10'])

@app.route('/page11/')
def page11():
    return render_template('page11.html', page_titles=page_titles, page_title=page_titles['page11'])

@app.route('/page12/')
def page12():
    return render_template('page12.html', page_titles=page_titles, page_title=page_titles['page12'])

if __name__ == '__main__':
    app.run(debug=True)
